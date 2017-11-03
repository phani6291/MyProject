import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { AppLayoutContainerComponent } from './app-layout-container/app-layout-container.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppContentComponent } from './components/app-content/app-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import {FlexLayoutModule} from '@angular/flex-layout';
const components = [
  AppLayoutContainerComponent,
  AppContentComponent,
  AppFooterComponent,
  AppHeaderComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,    
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    FlexLayoutModule
  ],
  declarations: [
    ...components      
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [    
    AppLayoutContainerComponent,
  ]
})
export class AppLayoutModule { }
