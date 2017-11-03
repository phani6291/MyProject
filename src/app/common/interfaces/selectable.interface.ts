import { Injectable } from '@angular/core';

export interface Selectable<T>{
    label:string;
    value: any;
}

@Injectable()

export class Option implements Selectable<any>{
    label: string;
    value: any;
}