import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeGuard } from './employee.guard';
import { LeaveComponent } from './dashboard/employee/leave/leave.component';
import { GaugeComponent } from './dashboard/hr/gauge/gauge.component';
import { EmployeeAddComponent } from './dashboard/hr/employee-add/employee-add.component';
import { ChartComponent } from './dashboard/hr/chart/chart.component';
import { HrComponent } from './dashboard/hr/hr.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"leave",component:LeaveComponent,canActivate:[EmployeeGuard]},
 {path:"employee",component:EmployeeComponent,canActivate:[EmployeeGuard]},
 {path:"employeeAdd",component:EmployeeAddComponent,canActivate:[AuthGuard]},
  {path:"hr",component:HrComponent,canActivate:[AuthGuard]},
  {path:"chart",component:ChartComponent,canActivate:[AuthGuard]},
  {path:"gauge",component:GaugeComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:'',redirectTo:'/login' ,pathMatch:'full'},
  { path: '**', pathMatch: 'full', component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
