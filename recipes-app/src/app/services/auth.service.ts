import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private API_KEY = environment.ANGULAR_APP_FIREBASE_API_KEY;

  constructor(
    private http: HttpClient
  ) { }

  signup(email: string, password: string) {
    let body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<AuthResponseData>(this.signupURL + this.API_KEY, body).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    let body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<AuthResponseData>(this.loginURL + this.API_KEY, body).pipe(catchError(this.handleError));
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
