import { Component, OnInit } from '@angular/core';

import {Login} from '../model/login';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';
import {PatientSpaceService} from '../services/patient-space.service';
import {User} from '../model/user';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:Login = new Login('','');

  UserC: User ;


  Usercurrent : User[] = null;

  constructor(private service: PatientSpaceService,private router: Router) { }

  ngOnInit() {

  }


  Login(email:string,password:string){

    $('#notification').empty();


    this.service.GetCurrentUser(email,password).subscribe(data =>{
      this.Usercurrent=data;
        // @ts-ignore
        this.UserC = data;

        localStorage.setItem('Usercurrent', JSON.stringify(this.UserC));
    }

    )

    if(this.UserC == null ){

      $('#notification').append('<div class="shortcode-notification alert alert-danger">Email or Password are incorrect.</div>');

    }

    if(this.Usercurrent != null){

      this.router.navigate([''])
    }

  }

}
