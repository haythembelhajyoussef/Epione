import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {DoctolibDoctor} from '../model/doctolib-doctor';
import {DoctolibService} from '../services/doctolib.service';
import {AppComponent} from '../app.component';
import { FirstlettreComponent } from './firstlettre/firstlettre.component';
import {RouterModule} from '@angular/router';
import { DetailsDoctorComponent } from './details-doctor/details-doctor.component';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDPIuR6EKoHIHFnOqr6WN_Q7_dNDy6Nwj8'
    })
  ],
  exports: [
    ListComponent
  ],
  declarations: [ListComponent, FirstlettreComponent, DetailsDoctorComponent]
})
export class DoctolibModule {
}
