import { Injectable, Optional, Output, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { InputType } from './input-type.model';
import { FieldType } from './field-type.model';
import { IFieldConfig, FieldConfig, ResponsiveTileConfig } from '../../common/interfaces/field-config.interface';
import { Selectable, Option } from '../../common/interfaces/selectable.interface';
import { ValidationService } from '../../common/services/validation.service'

@Injectable()
export abstract class FormField<T, U extends FieldType, V extends AbstractControl = FormControl> implements IFieldConfig<U>, OnInit, OnDestroy, OnChanges {

  formGroup: FormGroup;
  inputType?: InputType;
  fieldType: U;

  @Input() name: string;
  @Input() defaultValue?: any;
  @Input() placeholder?: string;
  @Input() hintLabel?: string;
  control: V;

  @Input() color?: string;
  @Input() isDisabled?: boolean;
  @Input() isRequired?: boolean;

/*

  @Input() config: FieldConfig;

  @Input() options?: Option[];

  @Input() startView: string= 'month';
  @Input() startAt: Date | null;

  @Input() maxLength?: number;
  @Input() minLength?: number;


  @Input() maxDate: Date | null;
  @Input() minDate: Date | null;
  */
  @Output() onChange = new EventEmitter<any>();
  @Input() colspanConfig: ResponsiveTileConfig = [4,4,4];

  onDestroy$: Subject<boolean> = new Subject<boolean>();


  constructor(protected formGroupDirective: FormGroupDirective,protected changeDetectorRef : ChangeDetectorRef){
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.isDisabled){
      this.setDisabled(changes.isDisabled.currentValue);
    }
    /*
    if(changes.control){
      console.log({changes, hasErrorMessage: this.hasErrorMessage}, 'control changed');
    }
    */
  }



  ngOnInit(){
    if(this.formGroupDirective) this.formGroup = this.formGroupDirective.form;
    this.control = this.formGroup.get(this.name) as V;
    // this.registerDisableIfStream();
    // console.log(this, 'ngOnInit formfield');
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.onDestroy$.unsubscribe();
  }

  get errorMessage() {
    if(!this.control) return null;
    // console.log(this.control, 'checking error message');
    return ValidationService.getControlErrorMessage(this.control)
  }

  get hasErrorMessage(): boolean{
    if(!this.control) return false;
    // console.log({control:this.control, errorMessage: this.errorMessage} , this.name+ ' hasErrorMessage')
    return !!(this.errorMessage && this.errorMessage.length);
  }

  public setDisabled(disabled: boolean){
    if(!this.control) return;
    if(disabled){
      this.control.disable()
    } else {
      this.control.enable()
    }
  }
   /*
  private registerDisableIfStream(){
    if(this.disableIf$){
      this.disableIf$.takeUntil(this.onDestroy$).subscribe(disabled => this.setDisabled(disabled))
    }
  }
  */


}
