import { Component, OnInit } from '@angular/core';
import {Appointment} from '../../model/Appointment';
import {PatientSpaceService} from '../../services/patient-space.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listappointmentscancelled',
  templateUrl: './listappointmentscancelled.component.html',
  styleUrls: ['./listappointmentscancelled.component.css']
})
export class ListappointmentscancelledComponent implements OnInit {

  listappointments : Appointment[] = [];

  constructor(private service: PatientSpaceService,private router: Router) { }

  ngOnInit() {

    this.service.GetListAppointments().subscribe(data =>{
      this.listappointments=data}
    )

  }

}
