import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsPortalComponent } from './parents-portal/parents-portal.component';

@NgModule({
  imports: [
    CommonModule,
    ParentsRoutingModule
  ],
  declarations: [ParentsPortalComponent]
})
export class ParentsModule { }
