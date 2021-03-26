import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs'
import { Store } from '@ngrx/store';
;import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private API_KEY = environment.ANGULAR_APP_FIREBASE_API_KEY;
  private tokenExpirationTimer: any;
  //user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  signup(email: string, password: string) {
    let body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<AuthResponseData>(this.signupURL + this.API_KEY, body)
      .pipe(catchError(this.handleError), tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      }));
  }

  autoLogin() {
    const userData: {email: string, localId: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));

    if(!userData) {
      return;
    }
    
    const loadedUser = new User(userData.email, userData.localId, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      //this.user.next(loadedUser);
      this.store.dispatch(new AuthActions.AuthenticateSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)}))
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
    else {
      localStorage.removeItem('userData');
    }
  }

  login(email: string, password: string) {
    let body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<AuthResponseData>(this.loginURL + this.API_KEY, body)
      .pipe(catchError(this.handleError), tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      }));
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    //this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, localId:string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, localId, idToken, expirationDate);

    localStorage.setItem('userData', JSON.stringify(user));

    //this.user.next(user);
    this.store.dispatch(new AuthActions.AuthenticateSuccess({email: user.email, userId: user.id, token: user.token, expirationDate:  expirationDate}))
    this.autoLogout(expiresIn * 1000);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if(!error.error || !error.error.error){
      return throwError(errorMessage);
    }

    switch(error.error.error.message) {
      case 'EMAIL_EXISTS': errorMessage = 'This email exists already'; break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'This email was not found!'; break;
      case 'INVALID_PASSWORD': errorMessage = 'Invalid password!'; break;
      case 'USER_DISABLED': errorMessage = 'This user is disabled!'; break;
    }

    return throwError(errorMessage);
  }
}
