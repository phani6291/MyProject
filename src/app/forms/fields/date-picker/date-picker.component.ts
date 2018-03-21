import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, Optional, Output, EventEmitter  } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/take";
import { FieldType, InputType, FormField  } from "../../models";
import { Option, DatepickerFieldConfig } from '../../../common/interfaces';


@Component({
  selector: 'schofeat-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent extends FormField<DatepickerFieldConfig,FieldType.datepicker> implements OnInit {

  @Input() startView: string= 'month';
  @Input() startAt: Date | null;
  @Input() filter: boolean | false;
  @Input() minDate: Date | null;
  @Input() maxDate: Date | null;

  @Output() dateInput = new EventEmitter<any>();

  control: FormControl;
  config: DatepickerFieldConfig;
  // config: FieldConfig;


  readonly fieldType = FieldType.datepicker;

  constructor(protected formGroupDirective: FormGroupDirective) {
    super(formGroupDirective);
  }

}
