import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchofeatLoginComponent } from 'app/home/schofeat-login/schofeat-login.component';

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
