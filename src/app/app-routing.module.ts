import { NgModule } from  '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SchofeatLoginComponent } from './home/schofeat-login/schofeat-login.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard'
import { RegistrationPageComponent } from './registration/registration-page/registration-page.component';

const routes: Routes = [
    {
        path: 'login',                
        redirectTo: '/welcome/login',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: '/welcome/login',
        pathMatch: 'full'
    },
    {
        path: 'teachers-portal',
        loadChildren: 'app/teachers/teachers.module#TeachersModule'
    },
    {
        path: 'parents-portal',
        loadChildren: 'app/parents/parents.module#ParentsModule'
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
    {
        path: 'info',
        loadChildren: 'app/info/info.module#InfoModule'
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