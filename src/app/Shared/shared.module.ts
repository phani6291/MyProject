import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SchoFeatFormsModule } from 'app/forms/forms.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

const modules =[
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,    
    FlexLayoutModule,
    SchoFeatFormsModule,
    HttpClientModule];

@NgModule({  
    imports:[...modules],  
    declarations:[],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    exports:[...modules],    
})

export class SharedModule{}