import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

@Injectable()
export class AuthEffects {

    private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    private API_KEY = environment.ANGULAR_APP_FIREBASE_API_KEY;

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START), 
        switchMap((authData: AuthActions.LoginStart) => {
            let body = {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
            
            return this.http.post<AuthResponseData>(this.loginURL + this.API_KEY, body).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
                    return new AuthActions.Login({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate });
                }), catchError(error => {
                    let errorMessage = 'An unknown error occurred!';
    
                    if(!error.error || !error.error.error){
                        return of(new AuthActions.LoginFail(errorMessage));
                    }

                    switch(error.error.error.message) {
                        case 'EMAIL_EXISTS': errorMessage = 'This email exists already'; break;
                        case 'EMAIL_NOT_FOUND': errorMessage = 'This email was not found!'; break;
                        case 'INVALID_PASSWORD': errorMessage = 'Invalid password!'; break;
                        case 'USER_DISABLED': errorMessage = 'This user is disabled!'; break;
                    }
                    
                    return of(new AuthActions.LoginFail(errorMessage));
                }),);
        }), 
    );

    @Effect({dispatch: false})
    authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() => {
        this.router.navigate(['/']);
    }));

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
    ) {}

}