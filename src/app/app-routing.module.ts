import { NgModule } from  '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SchofeatLoginComponent } from './core/schofeat-login/schofeat-login.component';
import { DashboardComponent } from './core/student/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard'
import { RegistrationPageComponent } from './core/registration/registration-page/registration-page.component';

const routes: Routes = [
    {
        path: 'login',
        component: SchofeatLoginComponent,
        data:{
            title: 'SchoFeat Login Page'
        }
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'dashboard'
          }
    },
    {
        path: 'register',
        component: RegistrationPageComponent,        
        data: {
            title: 'registration'
          }
    },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false, enableTracing: false }),    
  ],
  exports: [
    RouterModule
  ]  
})
export class AppRoutingModule {}