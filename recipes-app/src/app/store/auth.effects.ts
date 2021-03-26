import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess({email: email, userId: userId, token: token, expirationDate: expirationDate });
}

const handleError = (error) => {
    let errorMessage = 'An unknown error occurred!';
    
    if(!error.error || !error.error.error){
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }

    switch(error.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'This email exists already'; break;
        case 'EMAIL_NOT_FOUND': errorMessage = 'This email was not found!'; break;
        case 'INVALID_PASSWORD': errorMessage = 'Invalid password!'; break;
        case 'USER_DISABLED': errorMessage = 'This user is disabled!'; break;
    }
    
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

    private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    private signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    private API_KEY = environment.ANGULAR_APP_FIREBASE_API_KEY;

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START), 
        switchMap((authData: AuthActions.LoginStart) => {
            let body = {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            };
            
            return this.http.post<AuthResponseData>(this.loginURL + this.API_KEY, body).pipe(
                tap((resData) => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }), catchError(error => {
                    return handleError(error);
                }),
            );
        }), 
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap(() => {
        this.router.navigate(['/']);
    }));

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupActions: AuthActions.SignupStart) => {
            let body = {
                email: signupActions.payload.email,
                password: signupActions.payload.password,
                returnSecureToken: true
            };
          
            return this.http.post<AuthResponseData>(this.signupURL + this.API_KEY, body).pipe(
                tap((resData) => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }), catchError(error => {
                    return handleError(error);
                }),
            );
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {email: string, localId: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));

            if(!userData) {
                return { type: 'DUMMY'};
            }
            
            const loadedUser = new User(userData.email, userData.localId, userData._token, new Date(userData._tokenExpirationDate));

            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);

                return (new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email, 
                    userId: loadedUser.id, 
                    token: loadedUser.token, 
                    expirationDate: new Date(userData._tokenExpirationDate)
                }));
            }
            else {
                localStorage.removeItem('userData');
                return { type: 'DUMMY'};
            }
        })
    )

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }));

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {}

}