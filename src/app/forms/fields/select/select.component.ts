import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges, Optional  } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { FieldConfig, Option } from '../../../common/interfaces';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'schofeat-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent extends FormField implements OnInit, OnChanges, OnDestroy {

  @Input() options?: Option[];
  readonly fieldType = 'select';
  @Input() compareWithFn = (obj1: any, obj2: any) =>{
    return obj1 == obj2;
  }
  constructor() {
    super();
  }

  ngOnInit() {
    this.control = this.group.get(this.name) as FormControl;
  }
}
