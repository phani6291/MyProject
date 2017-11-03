import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { FileSelectorComponent } from './fields/file-selector/file-selector.component';
import { TextboxComponent } from './fields/textbox/textbox.component';
import { SelectComponent } from './fields/select/select.component';
import { DatePickerComponent } from './fields/date-picker/date-picker.component';

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
    FileSelectorComponent
];
@NgModule({

    imports: [
        ...modules
    ],
    declarations: [...components],
    exports: [...components ],
    providers: [Title],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SchoFeatFormsModule { }