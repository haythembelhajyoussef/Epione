import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DoctolibModule} from './doctolib/doctolib.module';
import {HttpClientModule} from '@angular/common/http';
import {DoctolibService} from './services/doctolib.service';

import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {RegisterDoctorComponent} from './Account/register-doctor/register-doctor.component';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './Analytics/dashboard/dashboard.component';
import {AnalyticsService} from './services/analytics.service';
import {AppointmentAComponent} from './Analytics/appointment-a/appointment-a.component';
import {HomeAComponent} from './Analytics/home-a/home-a.component';
import { PatientAComponent } from './Analytics/patient-a/patient-a.component';
import {CountdownModule} from 'ngx-countdown';
import { IndexComponent } from './index/index.component';
import { ListdoctorsComponent } from './PatientSpace/listdoctors/listdoctors.component';
import { ListdoctorsdetailsComponent } from './PatientSpace/listdoctorsdetails/listdoctorsdetails.component';
import { ListAppointmentsComponent } from './PatientSpace/list-appointments/list-appointments.component';
import { ListAppointmentsTreatedComponent } from './PatientSpace/list-appointments-treated/list-appointments-treated.component';
import { AppointmentToUpdateComponent } from './PatientSpace/appointment-to-update/appointment-to-update.component';
import { MapComponent } from './PatientSpace/map/map.component';
import {PatientSpaceService} from './services/patient-space.service';
import { ListappointmentscancelledComponent } from './PatientSpace/listappointmentscancelled/listappointmentscancelled.component';

// Components

import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterDoctorComponent,
    DashboardComponent,
    AppointmentAComponent,
    HomeAComponent,
    PatientAComponent,
    IndexComponent,
    ListdoctorsComponent,
    ListdoctorsdetailsComponent,
    ListAppointmentsComponent,
    ListAppointmentsTreatedComponent,
    AppointmentToUpdateComponent,
    MapComponent,
    ListappointmentscancelledComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    DoctolibModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CountdownModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPIuR6EKoHIHFnOqr6WN_Q7_dNDy6Nwj8'
}),
    AgmDirectionModule



  ],
  providers: [DoctolibService, AnalyticsService,PatientSpaceService,GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule {
}
