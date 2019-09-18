import { Component, OnInit } from '@angular/core';
import {PatientSpaceService} from '../../services/patient-space.service';
import {User} from '../../model/user';
import {Search} from '../../model/Search';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-listdoctors',
  templateUrl: './listdoctors.component.html',
  styleUrls: ['./listdoctors.component.css']
})
export class ListdoctorsComponent implements OnInit {

  listdoctors : User[] = [];



  constructor(private service: PatientSpaceService,private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let params :any = this.activatedRoute.snapshot.params;
    let specialty:string = params.specialty;
    let address:string = params.address;

    this.service.GetListDoctors(specialty,address).subscribe(data =>{
      this.listdoctors=data}
    )
  }


}
