export interface SchofeatLoginState {
    isSubmitting: boolean;    
    hasError: boolean;
    errorMessage: string | null;
    isCompleted: boolean;
}

export interface SchofeatLoginInfo{
    username: string;
    password:string;
}