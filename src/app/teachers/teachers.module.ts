import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersPortalComponent } from './teachers-portal/teachers-portal.component';

@NgModule({
  imports: [
    CommonModule,
    TeachersRoutingModule
  ],
  declarations: [TeachersPortalComponent]
})
export class TeachersModule { }
