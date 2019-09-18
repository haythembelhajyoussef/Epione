import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {Appointment} from '../../model/Appointment';
import {PatientSpaceService} from '../../services/patient-space.service';


@Component({
  selector: 'app-list-appointments-treated',
  templateUrl: './list-appointments-treated.component.html',
  styleUrls: ['./list-appointments-treated.component.css']
})
export class ListAppointmentsTreatedComponent implements OnInit {

  listappointments : Appointment[] = [];

  constructor(private service: PatientSpaceService) { }


  ngOnInit() {

    this.service.GetListAppointments().subscribe(data =>{
      this.listappointments=data}
    )



    jQuery(document).ready(function () {
      jQuery('#annoncesTable').DataTable({
        "bPaginate": false,
        "info": false,
        "sDom": '<"pull-right"l><"pull-left"f>tip',


        "aoColumns": [ { "bSearchable": false }, { "bSearchable": false }, { "bSearchable": false }, { "bSearchable": false }, { "bSearchable": false }, { "bSearchable": true }, { "bSearchable": false } ]
      });


    });
  }

}

