import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    return this.http.post<AuthResponseData>(this.signupURL + this.API_KEY, body);
  }
}
