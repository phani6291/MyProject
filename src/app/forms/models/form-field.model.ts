import { Injectable, Optional, Output, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FieldConfig } from '../../common/interfaces/field-config.interface';
import { Selectable, Option } from '../../common/interfaces/selectable.interface';
import { TileConfig } from '../../common/interfaces/tile-config';
import { ValidationService } from '../../common/services/validation.service'

import 'rxjs/add/operator/takeUntil';

@Injectable()
export abstract class FormField implements FieldConfig, OnInit, OnDestroy, OnChanges {
    inputType?: string;
    fieldType: string;
  
    @Input() name: string;
    @Input() defaultValue?: any;
    @Input() placeholder?: string;
    @Input() hintLabel?: string;
  
    @Input() isDisabled?: boolean;
    @Input() isDisabled$?: Observable<boolean>;
  
    @Input() isRequired?: boolean;
  
    @Input() group: FormGroup;
    @Input() control: FormControl;
    @Input() config: FieldConfig;
  
    @Input() options?: Option[];
  
    @Input() startView: string= 'month';
    @Input() startAt: Date | null;
  
    @Input() maxLength?: number;
    @Input() minLength?: number;
    @Input() color?: string;
  
    @Input() maxDate: Date | null;
    @Input() minDate: Date | null;
    @Output() onChange = new EventEmitter<any>();
  
    onDestroy$: Subject<boolean> = new Subject<boolean>();
  
    constructor(){ }
  
    ngOnChanges(changes: SimpleChanges){
      if(changes.isDisabled){
        this.setDisabled(changes.isDisabled.currentValue);
      }
    }
  
    ngOnInit(){
      this.registerIsDisabledStream()  
    }
  
    ngOnDestroy() {
      this.onDestroy$.next(true);
      // Now let's also unsubscribe from the subject itself:
      this.onDestroy$.unsubscribe();
    }
  
    get errorMessage() {
      if(!this.control) return null;
      return ValidationService.getControlErrorMessage(this.control)
    }
  
    get hasErrorMessage(): boolean{
      if(!this.control) return false;
      return !!(this.errorMessage && this.errorMessage.length);
    }
  
    private setDisabled(disabled: boolean){
      if(!this.control) return;
      if(disabled){
        this.control.disable()
      } else {
        this.control.enable()
      }
    }
  
    private registerIsDisabledStream(){
      if(this.isDisabled$){
        this.isDisabled$.takeUntil(this.onDestroy$).subscribe(disabled => this.setDisabled(disabled))
      }
    }
  
    // used by dynamic-field-directive to initialize programatically (instead of via template)
    setConfig(config: FieldConfig){
        this.config = config;
        this.name = config.name || '';
        this.defaultValue = config.defaultValue || null;
        this.placeholder = config.placeholder || null;
        this.hintLabel = config.hintLabel || null;
        if(config.inputType) this.inputType = config.inputType;
        if(config.fieldType) this.fieldType = config.fieldType;
        this.isDisabled = config.isDisabled || null;
        this.options = config.options || null;
        this.isRequired = config.isRequired || null;
        this.isDisabled$ = config.isDisabled$;
        this.startView = config.startView;
        this.startAt = config.startAt;
        this.maxLength = config.maxLength;
        this.minLength = config.minLength;
        this.color = config.color;
        this.maxDate = config.maxDate;
        this.minDate = config.minDate;
    }
}