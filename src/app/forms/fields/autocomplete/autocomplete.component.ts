import { Component, OnInit, Input, OnChanges, OnDestroy, Optional, SimpleChanges } from '@angular/core';
import { Validators, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from "rxjs";
import "rxjs/add/operator/take";
import { FieldType, InputType, FormField  } from "../../models";
import { Option, AutocompleteFieldConfig } from '../../../common/interfaces';

@Component({
  selector: 'schofeat-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent extends FormField<AutocompleteFieldConfig, FieldType.autocomplete> implements OnInit {
  
    @Input() hintLabel = '';
    @Input() isDisabled = false;
    @Input() isRequired = false;
    @Input() options: Option[]=[];
  
    filteredOptions$: Observable<Option[]>;
  
    readonly inputType = InputType.text;
    readonly fieldType = FieldType.autocomplete;
  
    constructor(protected formGroupDirective: FormGroupDirective) {
      super(formGroupDirective);
    }
  
    ngOnInit() {
      super.ngOnInit();
      this.filteredOptions$ = this.control.valueChanges
        .startWith(null)
        .map(option => (option && typeof option === 'object' ? option.label : option))
        .map(label => label ? this.filter(label) : this.options.slice());
    }
  
    filter(text: string): Option[] {
        const regEx = new RegExp(`^${text}`, 'gi');
        return this.options.filter(option => regEx.test(option.label) || regEx.test(option.value));
    }
  
    displayFn(option: Option): string {
      return option ? option.label : '';
    }
  
  }
  