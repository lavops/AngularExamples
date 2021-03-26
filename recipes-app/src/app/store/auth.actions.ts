import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail'
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export type AuthActions = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError;

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    public payload: {email: string, userId: string, token: string, expirationDate: Date};

    constructor(payload: {email: string, userId: string, token: string, expirationDate: Date}) {
        this.payload = payload;
    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    public payload: {email: string, password: string};

    constructor(payload: {email: string, password: string}) {
        this.payload = payload;
    }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    public payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    public payload: {email: string, password: string};

    constructor(payload: {email: string, password: string}) {
        this.payload = payload;
    }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}