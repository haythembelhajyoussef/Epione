import { Component, OnInit } from '@angular/core';

import {PatientSpaceService} from '../../services/patient-space.service';
import {Appointment} from '../../model/Appointment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {

  listappointments : Appointment[] = [];

  constructor(private service: PatientSpaceService,private router: Router) { }

  ngOnInit() {

    this.service.GetListAppointments().subscribe(data =>{
      this.listappointments=data}
    )







  }


  CancelAppointment(appointmentid : number){

    this.service.CancelAppointments(appointmentid).subscribe()

    this.router.navigate(['/listappointmentscancelled'])
    window.location.reload();
  }

}
