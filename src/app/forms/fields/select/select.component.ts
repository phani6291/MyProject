import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, Optional  } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { FieldType, InputType, FormField  } from "../../models";
import { Option, SelectFieldConfig } from '../../../common/interfaces';


@Component({
  selector: 'schofeat-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent extends FormField<SelectFieldConfig, FieldType.select> implements OnInit, OnChanges, OnDestroy {
  @Input() options?: Option[];

  readonly fieldType = FieldType.select;
  @Input() compareWithFn = (obj1: any, obj2: any) =>{
    return obj1 == obj2;
  }
  constructor(protected formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

  get insertPlaceholderOption(): boolean {
    const hasPlaceholderText = this.placeholder && !!this.placeholder.length;
    const alreadyHasPlaceholderOption = !!(this.options || []).find(o=>o.value===null);
    if(hasPlaceholderText && !alreadyHasPlaceholderOption) return true;
    return false;
  }
}
