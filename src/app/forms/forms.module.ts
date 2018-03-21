import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { DynamicFieldGroupComponent } from './dynamic-group/dynamic-field-group.component';
import { ConnectFormDirective } from './connect-form/connect-form.directive';

import { AutocompleteComponent, 
         FileSelectorComponent, 
         TextboxComponent, 
         SelectComponent, 
         DatePickerComponent,
         CheckboxComponent
} from './fields';

const modules = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
];

const components = [
    TextboxComponent,
    SelectComponent,
    DatePickerComponent,
    FileSelectorComponent,
    AutocompleteComponent,
    CheckboxComponent
];
const dynamics = [
    DynamicFieldDirective,
    DynamicFieldGroupComponent
  ];

@NgModule({

    imports: [
        ...modules
    ],
    declarations: [...components,...dynamics, ConnectFormDirective, CheckboxComponent],
    exports: [...components,...dynamics, ConnectFormDirective ],
    providers: [Title],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoFeatFormsModule { }