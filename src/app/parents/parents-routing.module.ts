import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentsPortalComponent } from 'app/parents/parents-portal/parents-portal.component';

const routes: Routes = [{
  path:'',
  children:[      
      {
          path:'welcome',
          component:ParentsPortalComponent,
          data:{
              title:'Schofeat Parents'
          }
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
