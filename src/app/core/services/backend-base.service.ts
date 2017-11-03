import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()

export class BackendBaseService {
    handleServerError(weServerError: WeServerError) {
        return Observable.throw(weServerError.message || 'Server Error');
    }
}

export interface IWeServerError {
    message: string,
    error: WeServerError | any,
    context?: any
}

export class WeServerError implements IWeServerError {
    message: string;
    error: WeServerError | any;
    context?: any;

    constructor(error: any = null, clientMsg: string = null, context: any = null) {
        this.message = clientMsg || error.message || error.Message || 'Server error.';
        this.error = error || null;
        this.context = context;
        console.log({ error: this.error, context: this.context }, this.message);

    }
}

