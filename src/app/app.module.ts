import { GaugeComponent } from './dashboard/hr/gauge/gauge.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { HrComponent } from './dashboard/hr/hr.component';
import { EmployeeAddComponent } from './dashboard/hr/employee-add/employee-add.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './dashboard/hr/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import { FilterPipe } from './filter.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LeaveComponent } from './dashboard/employee/leave/leave.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HrComponent,
    EmployeeAddComponent,
    LoginComponent,
    ChartComponent,
    GaugeComponent,
    FilterPipe,
    LeaveComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
