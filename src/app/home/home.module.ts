import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { EffectsModule } from '@ngrx/effects';


import { SchoFeatLoginEffects } from './schofeat-login/store/schofeat-login.effects';
import { SchofeatLoginBackendService } from './schofeat-login/store/schofeat-login-backend.service';

import { StoreModule } from '@ngrx/store';
import { reducer } from './schofeat-login/store/schofeat-login.reducer';
import { SchoFeatLoginStore } from './schofeat-login/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SchofeatLoginComponent } from './schofeat-login/schofeat-login.component';

import { SharedModule } from 'app/Shared/shared.module';
const components = [
    SchofeatLoginComponent
]

@NgModule({
    imports: [
        SharedModule,
        StoreModule.forRoot({ schofeatLogin: reducer }),
        StoreDevtoolsModule.instrument({ maxAge: 50 }),
        EffectsModule.forRoot([SchoFeatLoginEffects])
    ],
    declarations: [...components],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [SchoFeatLoginStore, SchofeatLoginBackendService],
    exports: [...components]
})

export class HomeModule { }