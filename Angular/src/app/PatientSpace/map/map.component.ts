import { Component, OnInit } from '@angular/core';
import {PatientSpaceService} from '../../services/patient-space.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../model/user';

import { MouseEvent, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  listdoctordetail : User[] = [];



  userLocation: any;
  siteLocation: any;




  public origin: any;
  public destination: any;


   params :any = this.activatedRoute.snapshot.params;

   latitude:number = this.params.latitude;

   longitude:number = this.params.longitude;



  constructor(private service: PatientSpaceService,private router:Router,private activatedRoute: ActivatedRoute,private mapsWrapper: GoogleMapsAPIWrapper) {

    this.mapsWrapper = mapsWrapper
  }

  async ngOnInit() {

    let params :any = this.activatedRoute.snapshot.params;
    let id:number = params.id;


    this.service.GetDoctorDetail(id).subscribe(data =>{
      this.listdoctordetail=data}
    )




    await this.mapsWrapper.createMap(document.getElementById('map'), {
      zoom: 12
    })
    this.setCurrentPosition()
    this.getDirection()

  }





  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.mapsWrapper.setCenter({ lat: 36.81897, lng: 10.16579 })

        if (!this.userLocation) {
          this.userLocation = await this.mapsWrapper.createMarker(
            {
              position: { lat: position.coords.latitude, lng: position.coords.longitude },
              clickable: false
            })
        } else {
          this.userLocation.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        }

      })
    }
  }


  getDirection() {


    this.origin = {lat: 36.8991378, lng: 10.1895082 }

    this.destination = {lat: Number(this.latitude), lng: Number(this.longitude)}


  }


}
