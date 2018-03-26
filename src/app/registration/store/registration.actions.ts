import { Action } from '@ngrx/store';
import { RegistrationInfo } from './registration.interface';

export const ActionTypes = {
    REGISTER: '[RegistrationState] Register',
    REGISTER_SUCCESS: '[RegistrationState] Register Success',
    REGISTER_FAIL: '[RegistrationState] Register Fail'
}

export class Register implements Action{
    readonly type = ActionTypes.REGISTER;
    constructor(public payload: RegistrationInfo){}
}

export class RegisterSuccess implements Action{
    readonly type = ActionTypes.REGISTER_SUCCESS;
    constructor(public payload: string){}
}

export class RegisterFail implements Action{
    readonly type = ActionTypes.REGISTER_FAIL;
    constructor(public payload: any){}
}

export type Actions
    = Register
    | RegisterSuccess
    | RegisterFail;
