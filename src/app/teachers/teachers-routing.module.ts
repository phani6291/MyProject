import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersPortalComponent } from 'app/teachers/teachers-portal/teachers-portal.component';

const routes: Routes = [{
  path:'',
  children:[      
      {
          path:'welcome',
          component:TeachersPortalComponent,
          data:{
              title:'Schofeat Teachers'
          }
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
