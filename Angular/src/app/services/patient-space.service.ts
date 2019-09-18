import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';
import {Appointment} from '../model/Appointment';
import {Motive} from '../model/Motive';
import {Time} from '../model/Time';
import {Router} from '@angular/router';
import {Login} from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class PatientSpaceService {

  user : User ;



  constructor(private http:HttpClient,private router: Router) { }

  GetListDoctors(specilaty:string,address:string): Observable <User[]> {

    if(address == null){
      return this.http.get<User[]>("http://localhost:8089/epione-web/search/filter/"+specilaty,{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

    }

    if(address != null){

      return this.http.get<User[]>("http://localhost:8089/epione-web/search/filter/"+specilaty+"/"+address,{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

    }


  }

  GetListAppointments(): Observable <Appointment[]> {

    this.user = JSON.parse(localStorage.getItem('currentUser'));





    return this.http.get<Appointment[]>("http://localhost:8089/epione-web/search/patientappointment/"+this.user.id.toString(),{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

  }

  GetDoctorDetail(id:number): Observable <User[]> {


    return this.http.get<User[]>("http://localhost:8089/epione-web/confirmed/"+id.toString(),{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

  }


  GetMotivesBySpecialty(specialty:string): Observable <Motive[]> {


    return this.http.get<Motive[]>("http://localhost:8089/epione-web/search/motive/"+specialty,{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

  }

  GetAllTimes(): Observable <Time[]> {


    return this.http.get<Time[]>("http://localhost:8089/epione-web/appointment/times",{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

  }

  GetAppointmentById(id:number): Observable <Appointment[]> {


    return this.http.get<Appointment[]>("http://localhost:8089/epione-web/appointment/byid/"+id.toString(),{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

  }

  CancelAppointments(id:number): Observable <Appointment[]> {


    return this.http.put<Appointment[]>("http://localhost:8089/epione-web/appointment/"+id.toString(),{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});


  }

  AddAppointment(Appointment: object): Observable <Appointment[]> {


    return this.http.post<Appointment[]>("http://localhost:8089/epione-web/appointment",Appointment);


  }

  UpdateAppointment(Appointment:object,id:number): Observable <Appointment[]> {


    return this.http.put<Appointment[]>("http://localhost:8089/epione-web/appointment/?id="+id.toString(),Appointment);


  }


  GetCheckAppointments(date:string,id:number,startTime:string): Observable <Appointment[]> {


    return this.http.get<Appointment[]>("http://localhost:8089/epione-web/appointment/check/"+date+"/"+id.toString()+"/"+startTime,{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});

  }


  GetCurrentUser(email:string,password:string): Observable <User[]> {


    return this.http.get<User[]>("http://localhost:8089/epione-web/user/currentuser/"+email+"/"+password,{ headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')});


  }
















}
