import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';




export const INFO_ROUTES: Routes = [{
  path: '',
  children: [
      {
        path: 'about-us',
        component: AboutUsPageComponent,
        data: {
          title: 'About Us',
        }
      },
      {
        path: 'contact-us',
        component: ContactUsPageComponent,
        data: {
          title: 'Contact Us',
        }
      }
    ]
  }];



@NgModule({
  imports: [
    RouterModule.forChild(INFO_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class InfoRoutingModule { }
