import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'
import { RegistrationPageComponent } from 'app/registration/registration-page/registration-page.component';
import { AddressFormComponent } from 'app/registration/components/address-form/address-form.component';
import { PersonalInfoFormComponent } from 'app/registration/components/personal-info-form/personal-info-form.component';
import { SharedModule } from 'app/Shared/shared.module';


const components =[
    RegistrationPageComponent, 
    AddressFormComponent,
    PersonalInfoFormComponent
]

@NgModule({  
    imports:[SharedModule],  
    declarations:[...components],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    exports:[...components],    
})

export class RegistrationModule{}