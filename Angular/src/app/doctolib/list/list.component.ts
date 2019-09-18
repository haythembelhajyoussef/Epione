import {Component, OnInit} from '@angular/core';
import {DoctolibDoctor} from '../../model/doctolib-doctor';
import {DoctolibService} from '../../services/doctolib.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  doctolibDoctors: DoctolibDoctor[];
  alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(private doctolibService: DoctolibService) {
    this.doctolibService.getDoctolibDoctors().subscribe(data => this.doctolibDoctors = data);
  }

  ngOnInit() {
  }

}
