import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from 'app/student/dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';

const components = [DashboardComponent];

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [...components]
})
export class StudentModule {}
