import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from '../../common/interfaces';
import { ControlBuilder } from '../../common/services/control-builder.service';

@Component({
  // exportAs: 'dynamicFieldGroup',
  selector: 'dynamic-field-group',
  templateUrl: './dynamic-field-group.component.html',
})
export class DynamicFieldGroupComponent implements OnInit {

  @Input() config: FieldConfig[] = [];
  @Input() group: FormGroup;
  @Input() cols: number=4;

  constructor() {}

  ngOnInit() {}


}
