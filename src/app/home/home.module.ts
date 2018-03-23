import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'

import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { SchoFeatLoginEffects  } from './schofeat-login/store/schofeat-login.effects';
import { SchofeatLoginBackendService  } from './schofeat-login/store/schofeat-login-backend.service';

import { StoreModule } from '@ngrx/store';
import { reducer } from './schofeat-login/store/schofeat-login.reducer';
import { SchoFeatLoginStore  } from './schofeat-login/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SchofeatLoginComponent  } from './schofeat-login/schofeat-login.component';
import { MaterialModule } from 'app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SchoFeatFormsModule } from 'app/forms/forms.module';
const components =[
    SchofeatLoginComponent
]

@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        SchoFeatFormsModule,
        StoreModule.forRoot({schofeatLogin:reducer}),
        StoreDevtoolsModule.instrument({ maxAge: 50 }),
        EffectsModule.forRoot([SchoFeatLoginEffects])
    ],
    declarations:[...components],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    providers:[SchoFeatLoginStore, SchofeatLoginBackendService],
    exports:[...components]
})

export class HomeModule{}