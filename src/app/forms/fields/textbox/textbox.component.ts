import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, Optional, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { FieldType, InputType, FormField  } from "../../models";
import { Option, TextboxFieldConfig } from '../../../common/interfaces';



@Component({
  selector: 'schofeat-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextboxComponent extends FormField<TextboxFieldConfig, FieldType.textbox> implements OnInit, OnChanges, OnDestroy {
  
  
    @Input() placeholder ='';
    @Input() hintLabel = '';
    @Input() isDisabled = false;
    @Input() isRequired = false;
    @Input() maxLength: number = null;
    // @Input() group: FormGroup;
    @Input() color= 'primary';
  
    // group: FormGroup;
    @Input() control: FormControl;
    config: TextboxFieldConfig;
  
  
    @Input() inputType = InputType.text;
    readonly fieldType = FieldType.textbox;
  
    constructor(protected formGroupDirective: FormGroupDirective) {
      super(formGroupDirective);
      //console.log(formGroupDirective);
    }
  
  
  
    onBlur(){
      // if(this.name=='Phone' || this.name=='PhoneNumber'){
      //   this.formGroup.get(this.name).setValue((this.formGroup.get(this.name).value));
      // }
    }
  
    myErrorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
      // Error when invalid control is dirty, touched, or submitted
  
      const isSubmitted = form && form.submitted;
      const hasError= !!(control.invalid && (control.dirty || control.touched || isSubmitted));
      // console.log({control, form, hasError}, 'myErrorStateMatcher')
      return hasError;
    }
  }
