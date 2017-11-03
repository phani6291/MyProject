import { Action } from '@ngrx/store';
import { SchofeatLoginState, SchofeatLoginInfo } from './interfaces/schofeat-login.interfaces'

export const ActionTypes = {
    LOGIN: '[SchofeatLoginState] Login',
    LOGIN_SUCCESS: '[SchofeatLoginState] Login Success',
    LOGIN_FAIL: '[SchofeatLoginState] Login Fail'
}

export class Login implements Action{
    readonly type = ActionTypes.LOGIN;
    constructor(public payload: SchofeatLoginInfo){}
}

export class LoginSuccess implements Action{
    readonly type = ActionTypes.LOGIN_SUCCESS;
    constructor(public payload: string){}
}

export class LoginFail implements Action{
    readonly type = ActionTypes.LOGIN_FAIL;
    constructor(public payload: any){}
}

export type Actions
    = Login
    | LoginSuccess
    | LoginFail;
