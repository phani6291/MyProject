import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'

import { InfoRoutingModule  } from './info-routing.module';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';

const components =[
    AboutUsPageComponent, 
    ContactUsPageComponent
]

@NgModule({
    imports:[InfoRoutingModule],
    declarations:[...components],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    exports:[...components]
})

export class InfoModule{}