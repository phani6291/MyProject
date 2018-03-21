import { Observable } from "rxjs/Observable";

export interface IFormStore{
    isSubmitting$: Observable<boolean>;
    isFetching$:Observable<boolean>;
    hasError$: Observable<boolean>;
    errorMessage$: Observable<string | null>;
    isCompleted$: Observable<boolean>;
    value$: Observable<any>;
}

export abstract class FormStore<T> implements IFormStore{
    isSubmitting$: Observable<boolean>;
    isFetching$: Observable<boolean> = Observable.of(false);
    hasError$: Observable<boolean>;
    errorMessage$: Observable<string | null>;
    isCompleted$: Observable<boolean>;
    value$: Observable<T>;
    clearError(){};
    submit(value: T): void{};
}

export interface FormStore<T>{
    isSubmitting: boolean;
    isFetching: boolean;
    hasError: boolean;
    errorMessage: string | null;
    isCompleted: boolean;
    value: T;
}

export function initialFormState(){
    return {
        isSubmitting: false,
        isFetching: false,
        hasError: false,
        errorMessage: null,
        isCompleted: false,
        value: null
    }
}

export interface FormActionTypes {
    SUBMIT: string,
    SUBMIT_SUCCESS: string,
    SUBMIT_FAIL: string,
    UPDATE_VALUE: string,
    CLEAR_ERROR: string
}