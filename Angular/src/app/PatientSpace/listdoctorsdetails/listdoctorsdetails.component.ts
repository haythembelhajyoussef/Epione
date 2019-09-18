import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {PatientSpaceService} from '../../services/patient-space.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Motive} from '../../model/Motive';
import {Time} from '../../model/Time';
import {Search} from '../../model/Search';
import {Appointment} from '../../model/Appointment';
import {NgModel} from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-listdoctorsdetails',
  templateUrl: './listdoctorsdetails.component.html',
  styleUrls: ['./listdoctorsdetails.component.css'],
})
export class ListdoctorsdetailsComponent implements OnInit {

  appointment:Appointment = new Appointment();

  listdoctordetail : User[] = [];

  listmotivesbyspecialty : Motive[] = [];

  listalltimes : Time[] = [];

  listCheckAppointments : Appointment[] = [];



  dif:boolean =false

   params :any = this.activatedRoute.snapshot.params;
   iddoc:number = this.params.id;

  constructor(private service: PatientSpaceService,private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let params :any = this.activatedRoute.snapshot.params;
    let id:number = params.id;
    let specialtyname:string = params.specialty;

    this.service.GetDoctorDetail(id).subscribe(data =>{
      this.listdoctordetail=data}
    )

    this.service.GetMotivesBySpecialty(specialtyname).subscribe(data =>{
      this.listmotivesbyspecialty=data}
    )

    this.service.GetAllTimes().subscribe(data =>{
      this.listalltimes=data}
    )

    this.service.GetAllTimes().subscribe(data =>{
      this.listalltimes=data}
    )







  }


  AddAppointment(appointment:Appointment){

    const NewAppointment: object = {

      date: appointment.date,
      startTime: appointment.startTime,
      message: appointment.message,
      patient: {id:3},
      doctor : {id:this.iddoc},
      motive : {id:appointment.motive}


    };

    this.service.AddAppointment(NewAppointment)
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

  Check(date:string,startTime:string){

    $('#notification').empty();

    this.service.GetCheckAppointments(date,this.iddoc,startTime).subscribe(data =>{
      this.listCheckAppointments=data}
    )

    $('#notification').empty();

    for (let appointment of this.listCheckAppointments) {

      if(appointment.date == date && appointment.startTime == startTime ){


        $('#notification').append('<div class="shortcode-notification alert alert-danger">The chosen date is already taken, please choose another date.</div>');


      }

      if( 0 == this.iddoc){


        $('#notification').append('<div class="shortcode-notification alert alert-danger">You can not take a appointment with your self, please choose another doctor.</div>');


      }

      if(appointment.date != date && appointment.startTime != startTime ){


        $('#notification').append('<div class="shortcode-notification alert alert-success">The chosen date is available, please click on make a appointment</div>');
        document.getElementById('subForm').style.display = 'block';
        document.getElementById('subForm1').style.display = 'display';
      }


    }

  }





}
