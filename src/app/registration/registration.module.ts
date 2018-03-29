import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { SharedModule } from 'app/shared/shared.module';

import { EffectsModule } from '@ngrx/effects';

import { RegistrationEffects } from './store/registration.effects';
import { RegistrationBackendService } from './store/registration-backend.service';

import { StoreModule } from '@ngrx/store';
import { reducer } from './store/registration.reducer';
import { RegistrationStore } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const components =[
    RegistrationPageComponent, 
    AddressFormComponent,
    PersonalInfoFormComponent
]

@NgModule({  
    imports:[
        SharedModule,
        StoreModule.forFeature( 'registration', reducer ),        
        EffectsModule.forFeature([RegistrationEffects])
    ],  
    declarations:[...components],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    providers: [RegistrationStore, RegistrationBackendService],    
    exports:[...components],    
})

export class RegistrationModule{}