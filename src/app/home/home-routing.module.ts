import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchofeatLoginComponent } from 'app/home/schofeat-login/schofeat-login.component';
import { AuthGuard } from 'app/core/guards/auth.guard';

const routes: Routes = [
    {
        path:'welcome',
        data:{
            title:'Welcome',
            public:true
        },
        children:[
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full'
            },
            {
                path:'login',
                component:SchofeatLoginComponent,
                //canActivate:[AuthGuard],
                data:{
                    title:'Schofeat Login'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
