import { Action } from "@ngrx/store";

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export type AuthActions = Login | Logout;

export class Login implements Action {
    readonly type = LOGIN;
    public payload: {email: string, userId: string, token: string, expirationDate: Date};

    constructor(payload: {email: string, userId: string, token: string, expirationDate: Date}) {
        this.payload = payload;
    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}