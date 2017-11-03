import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, Optional, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { FieldConfig } from '../../../common/interfaces';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'schofeat-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextboxComponent extends FormField implements OnInit, OnChanges, OnDestroy {



  @Input() placeholder = '';
  @Input() hintLabel = '';
  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() group: FormGroup;
  @Input() color = 'primary';
  @Input() control: FormControl;
  @Input() inputType = 'text';
  config: FieldConfig;

  readonly fieldType = 'textbox';

  constructor() {
    super();
  }

  ngOnInit() {
    this.control = this.group.get(this.name) as FormControl;
  }

  myErrorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    // Error when invalid control is dirty, touched, or submitted
    const isSubmitted = form && form.submitted;
    const hasError = !!(control.invalid && (control.dirty || control.touched || isSubmitted));    
    return hasError;
  }

}
