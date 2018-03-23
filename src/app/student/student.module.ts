import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'
import { DashboardComponent } from 'app/student/dashboard/dashboard.component';
import { SharedModule } from 'app/Shared/shared.module';


const components =[
    DashboardComponent
]

@NgModule({  
    imports:[SharedModule],  
    declarations:[...components],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    exports:[...components],    
})

export class StudentModule{}