import {Component, OnInit} from '@angular/core';
import {DoctolibService} from '../../services/doctolib.service';
import {DoctolibDoctor} from '../../model/doctolib-doctor';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-firstlettre',
  templateUrl: './firstlettre.component.html',
  styleUrls: ['./firstlettre.component.css']
})
export class FirstlettreComponent implements OnInit {
  doctolibDoctors: DoctolibDoctor[];
  alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  urlId: string;

  constructor(private doctolibService: DoctolibService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.urlId = params.get('id');
    });
    this.doctolibService.getDoctolibDoctorsFirstLettre(this.urlId).subscribe(data => this.doctolibDoctors = data);
  }

  ngOnInit() {

  }

}
