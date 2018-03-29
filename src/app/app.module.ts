import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './core/guards/auth.guard'
import { AppLayoutModule } from './core/app-layout/app-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from 'app/home/home.module';
import { RegistrationModule } from 'app/registration/registration.module';
import { StudentModule } from 'app/student/student.module';
import { SharedModule } from 'app/shared/shared.module';


const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  AppLayoutModule,
  SharedModule,
  HomeModule,
  RegistrationModule,
  StudentModule
  ];

const components = [
  AppComponent,            
];

@NgModule({
 
  imports: [
    ...modules,
   ]
  ,
  declarations: [
    ...components    
  ],  
  providers: [Title,  AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
