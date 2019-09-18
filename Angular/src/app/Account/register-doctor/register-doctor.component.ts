import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DoctolibDoctor} from '../../model/doctolib-doctor';
import {DoctolibService} from '../../services/doctolib.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent implements OnInit {
  doctor: DoctolibDoctor = new DoctolibDoctor();
  checkPath: boolean = false;

  constructor(private doctolibService: DoctolibService, private router: Router) {
  }

  ngOnInit() {
  }

  addDoctolibDoctor(f: NgForm) {
    this.doctolibService.addDoctolibDoctor(this.doctor).subscribe(data => {
      this.router.navigate(['doctolib']);
    });
    alert('success');
  }

  onCheckPath(path: string) {
    this.doctor = new DoctolibDoctor();
    this.doctolibService.checkPath(path).subscribe(data => this.checkPath = data);
    if (this.checkPath != true) {
      this.doctolibService.getDoctolibDoctorByPath(path).subscribe(data => this.doctor = data[0]);
    }
  }
}
