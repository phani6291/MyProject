import { Directive, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { FieldConfig } from '../../common/interfaces';
import { FormField  } from "../models/form-field.model";

import {
  TextboxComponent,
  SelectComponent,
  DatePickerComponent,
  FileSelectorComponent
} from '../fields';

const components: {[type: string]: Type<FormField>} = {
  textbox: TextboxComponent,
  select: SelectComponent,
  datepicker: DatePickerComponent,
  fileselector: FileSelectorComponent
};

@Directive({
  selector: '[DynamicField]',
  // styleUrls: ['./dynamic-form-control.component.css']
})
export class DynamicFieldDirective implements OnInit {

  @Input() config: FieldConfig;

  @Input() group: FormGroup;

  // control: FormControl;

  component: ComponentRef<FormField>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    if (!components[this.config.fieldType]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.fieldType}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<FormField>(components[this.config.fieldType]);
    this.component = this.container.createComponent(component);

    this.component.instance.group = this.group;
    this.component.instance.setConfig(this.config);
  }
}
