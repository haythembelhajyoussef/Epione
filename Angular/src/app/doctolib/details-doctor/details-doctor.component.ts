import {Component, OnInit} from '@angular/core';
import {DoctolibService} from '../../services/doctolib.service';
import {DoctolibDoctor} from '../../model/doctolib-doctor';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details-doctor',
  templateUrl: './details-doctor.component.html',
  styleUrls: ['./details-doctor.component.css']
})
export class DetailsDoctorComponent implements OnInit {
  doctor: DoctolibDoctor = new DoctolibDoctor();
  urlId: string;

  constructor(private doctolibService: DoctolibService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.urlId = params.get('id');
    });
    this.doctolibService.getDoctolibDoctorByPath(this.urlId).subscribe(data => this.doctor = data[0]);
  }

  ngOnInit() {
  }

}
