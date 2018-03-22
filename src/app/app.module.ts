import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { SchoFeatLoginEffects  } from './core/schofeat-login/store/schofeat-login.effects';
import { SchofeatLoginBackendService  } from './core/schofeat-login/store/schofeat-login-backend.service';

import { StoreModule } from '@ngrx/store';
import { reducer } from './core/schofeat-login/store/schofeat-login.reducer';
import { SchoFeatLoginStore  } from './core/schofeat-login/store';

import { AuthGuard } from './core/guards/auth.guard'
import { AppLayoutModule } from './core/app-layout/app-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { SchoFeatFormsModule } from "./forms/forms.module";
import {FlexLayoutModule} from '@angular/flex-layout';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { SchofeatLoginComponent } from './core/schofeat-login/schofeat-login.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DashboardComponent } from './core/student/dashboard/dashboard.component';

import { RegistrationPageComponent } from './core/registration/registration-page/registration-page.component';
import { PersonalInfoFormComponent } from './core/registration/components/personal-info-form/personal-info-form.component';
import { AddressFormComponent } from './core/registration/components/address-form/address-form.component';



const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  AppLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  AppRoutingModule,
  MaterialModule,
  HttpClientModule,
  SchoFeatFormsModule,
  FlexLayoutModule,
 // AngularFontAwesomeModule
  ];

@NgModule({
 
  imports: [
    ...modules,
    StoreModule.forRoot({schofeatLogin:reducer}),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([SchoFeatLoginEffects])]
  ,
  declarations: [
    AppComponent,
    SchofeatLoginComponent,
    DashboardComponent,    
    RegistrationPageComponent,
    PersonalInfoFormComponent,
    AddressFormComponent       
  ],  
  providers: [Title, SchoFeatLoginStore, SchofeatLoginBackendService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
