import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, Optional, Output, EventEmitter  } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { FieldConfig } from '../../../common/interfaces';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'schofeat-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent extends FormField implements OnInit {

  @Input() startView: string= 'month';
  @Input() startAt: Date | null;
  @Input() filter: boolean | false;
  @Input() minDate: Date | null;
  @Input() maxDate: Date | null;

  @Output() dateInput = new EventEmitter<any>();
  
  control: FormControl;
  config: FieldConfig;

  readonly fieldType = 'datepicker';

  constructor() {
     super();
  }

  ngOnInit() {
    this.control = this.group.get(this.name) as FormControl;
  }

}
