import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
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
  private API_KEY = '';

  constructor(
    private http: HttpClient
  ) { }

  signup(email: string, password: string) {
    let body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return this.http.post<AuthResponseData>(this.signupURL + this.API_KEY, body).pipe(catchError(error => {
      let errorMessage = 'An unknown error occurred!';
      if(!error.error || !error.error.error){
        return throwError(errorMessage);
      }

      switch(error.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'This email exists already';
      }

      return throwError(errorMessage);
    }));
  }
}
