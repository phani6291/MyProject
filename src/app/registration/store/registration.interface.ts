import { mapObject } from "app/common/utils";

export interface RegistrationInfo{
    UserName: string;
    Password: string;
    ReEnterPassword: string;
    FirstName: string;
    LastName: string;
    BirthDate: Date;
    Gender: string;
    Phone: string;
    EmailAddress: string;
}

export const registrationInfoMap: Object ={
    UserName: [],
    Password: [],
    ReEnterPassword: [],
    FirstName: [],
    LastName: [],
    BirthDate: ['DataOfBirth'],
    Gender: ['Sex'],
    Phone: ['PhoneNumber'],
    EmailAddress: ['Email']
}

export const defaultRegistrationInfo = {
    UserName: null,
    Password: null,
    ReEnterPassword: null,
    FirstName: null,
    LastName: null,
    BirthDate: null,
    Gender: null,
    Phone: null,
    EmailAddress: null
}

export function toRegistrationInfo(data: any = {}):RegistrationInfo{
    return mapObject(data, registrationInfoMap, defaultRegistrationInfo) as RegistrationInfo;
    
}

export interface RegistrationState {
    isSubmitting: boolean;    
    hasError: boolean;
    errorMessage: string | null;
    isCompleted: boolean;
}