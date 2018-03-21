import { Directive, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { FieldConfig } from '../../common/interfaces';
import { FormField  } from "../models/form-field.model";
import { ControlBuilder } from '../../common/services/control-builder.service';

import {
  TextboxComponent,
  SelectComponent,
  DatePickerComponent,
  FileSelectorComponent
} from '../fields';

type FormFields =
TextboxComponent
|SelectComponent
|DatePickerComponent
|FileSelectorComponent;

const components: {[type: string]: Type<FormFields>} = {
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

  component: ComponentRef<FormFields>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private formGroupDirective: FormGroupDirective,
    public controlBuilder: ControlBuilder,
  ) {}

  ngOnInit() {
    this.group = this.formGroupDirective.form;
    if (!components[this.config.fieldType]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.fieldType}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<FormFields>(components[this.config.fieldType]);
    this.component = this.container.createComponent(component);
    let c = this.component.instance;
    Object.assign(this.component.instance, this.config);

    // if(this.config.requireIf$){
    //   this.config.requireIf$.takeUntil(c.onDestroy$).subscribe(required => this.setRequired(required))
    // }

    // if(this.config.disableIf$){
    //   this.config.disableIf$.takeUntil(c.onDestroy$).subscribe(disabled => c.setDisabled(disabled))
    // }
  }

  // private setRequired(required: boolean){
  //   let c = this.component.instance;
  //   if(!c.control) return;
  //   if(required === c.isRequired) return;
  //   c.isRequired = required;
  //   // console.log({required, control:c.control, rule: this.config.rules},'setRequired');
  //   let rules =this.config.rules;

  //   if(required){
  //     const requiredRule = rules.find(r => r.type === RuleType.Required)
  //     if(!requiredRule){
  //       rules = [FieldConfigService.rule(RuleType.Required),...rules];
  //     }
  //   } else {
  //     rules = rules.filter(r=>r.type === RuleType.Required);
  //   }
  //   c.control.setValidators(rules.map(this.controlBuilder.toValidator));
  //   c.control.updateValueAndValidity();
  // }
}
