import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './doctolib/list/list.component';
import {FirstlettreComponent} from './doctolib/firstlettre/firstlettre.component';
import {DetailsDoctorComponent} from './doctolib/details-doctor/details-doctor.component';
import {RegisterDoctorComponent} from './Account/register-doctor/register-doctor.component';
import {DashboardComponent} from './Analytics/dashboard/dashboard.component';
import {AppointmentAComponent} from './Analytics/appointment-a/appointment-a.component';
import {HomeAComponent} from './Analytics/home-a/home-a.component';
import {PatientAComponent} from './Analytics/patient-a/patient-a.component';
import {IndexComponent} from './index/index.component';
import {ListdoctorsComponent} from './PatientSpace/listdoctors/listdoctors.component';
import {ListdoctorsdetailsComponent} from './PatientSpace/listdoctorsdetails/listdoctorsdetails.component';
import {ListAppointmentsComponent} from './PatientSpace/list-appointments/list-appointments.component';
import {ListAppointmentsTreatedComponent} from './PatientSpace/list-appointments-treated/list-appointments-treated.component';
import {AppointmentToUpdateComponent} from './PatientSpace/appointment-to-update/appointment-to-update.component';
import {MapComponent} from './PatientSpace/map/map.component';
import {ListappointmentscancelledComponent} from './PatientSpace/listappointmentscancelled/listappointmentscancelled.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'listdoctors/:specialty/:address', component: ListdoctorsComponent},
  {path: 'listdoctorsdetails/:id/:specialty', component: ListdoctorsdetailsComponent},
  {path: 'listappointments', component: ListAppointmentsComponent},
  {path: 'listappointmentstreated', component: ListAppointmentsTreatedComponent},
  {path: 'appointmenttoupdate/:id/:specialty', component: AppointmentToUpdateComponent},
  {path: 'listappointmentscancelled', component: ListappointmentscancelledComponent},
  {path: 'map/:id/:specialty/:latitude/:longitude', component: MapComponent},
  {path: 'login', component: LoginComponent},

  {path: 'registerdoctor', component: RegisterDoctorComponent},
  {path: 'doctolib', component: ListComponent},
  {path: 'doctolib/firstlettre/:id', component: FirstlettreComponent},
  {path: 'doctolib/details/:id', component: DetailsDoctorComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/Home', component: HomeAComponent},
  {path: 'dashboard/appointment', component: AppointmentAComponent},
  {path: 'dashboard/patient', component: PatientAComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
