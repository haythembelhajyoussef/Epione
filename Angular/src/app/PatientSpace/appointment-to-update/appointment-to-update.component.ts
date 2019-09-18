import { Component, OnInit } from '@angular/core';
import {PatientSpaceService} from '../../services/patient-space.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Appointment} from '../../model/Appointment';
import {Time} from '../../model/Time';
import {Motive} from '../../model/Motive';
import * as $ from 'jquery';

@Component({
  selector: 'app-appointment-to-update',
  templateUrl: './appointment-to-update.component.html',
  styleUrls: ['./appointment-to-update.component.css']
})
export class AppointmentToUpdateComponent implements OnInit {

  appointment:Appointment = new Appointment();

  listappointmentbyid : Appointment[] = [];

  listalltimes : Time[] = [];

  listmotivesbyspecialty : Motive[] = [];

  listCheckAppointments : Appointment[] = [];

   params :any = this.activatedRoute.snapshot.params;
   idappointment:number = this.params.id;

  dif:boolean =false

  constructor(private service: PatientSpaceService,private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let params :any = this.activatedRoute.snapshot.params;
    let id:number = params.id;
    let specialtyname:string = params.specialty;

    this.service.GetAppointmentById(id).subscribe(data =>{
      this.listappointmentbyid=data}
    )

    this.service.GetMotivesBySpecialty(specialtyname).subscribe(data =>{
      this.listmotivesbyspecialty=data}
    )

    this.service.GetAllTimes().subscribe(data =>{
      this.listalltimes=data}
    )





  }

  UpdateAppointment(appointment:Appointment){

    const NewAppointment: object = {

      date: appointment.date,
      startTime: appointment.startTime,
      message: appointment.message,
      motive : {id:appointment.motive}


    };

    this.service.UpdateAppointment(NewAppointment,this.idappointment)
      .subscribe();

    this.router.navigate(['/listappointments'])
    window.location.reload();
  }

  getDiferenceInDays(date:Date):boolean  {
    var diff


    var pickeddate = new Date(date);

    pickeddate.setDate(pickeddate.getDate() + 1)

    diff= (( (pickeddate.valueOf()) - new Date().valueOf())) ;


    if(diff > 0) return true
    else return false


  }

  Check(date:string,startTime:string,iddoc:number,dateapp:string,startTimeapp:string){

    document.getElementById('notification').style.display = 'display';

    this.service.GetCheckAppointments(date,iddoc,startTime).subscribe(data =>{
      this.listCheckAppointments=data}
    )



    for (let appointment of this.listCheckAppointments) {

      if(appointment.date == date && appointment.startTime == startTime){


        $('#notification').append('<div class="shortcode-notification alert alert-danger">The chosen date is already the date of your appointment, please choose another date.</div>');
        document.getElementById('notification').style.display = 'block';
        return 1;
      }

      if( appointment.date == dateapp && appointment.startTime == startTimeapp){

        $('#notification').append('<div class="shortcode-notification alert alert-danger">The chosen date is already taken, please choose another date.</div>');
        document.getElementById('notification').style.display = 'block';
        return 2;
      }

      else {

        $('#notification').append('<div class="shortcode-notification alert alert-success">The chosen date is available, please click on make a appointment</div>');
        document.getElementById('subForm').style.display = 'block';
        document.getElementById('subForm1').style.display = 'display';
      }


    }

  }








}
