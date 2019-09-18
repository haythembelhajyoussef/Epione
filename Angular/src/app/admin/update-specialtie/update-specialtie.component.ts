import { Component, OnInit } from "@angular/core";

import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { DoctorService } from "src/app/services/doctor.service";
import { SpecialtyDTO } from "src/app/model/SpecialtyDTO";

@Component({
  selector: "app-update-specialtie",
  templateUrl: "./update-specialtie.component.html",
  styleUrls: ["./update-specialtie.component.css"]
})
export class UpdateSpecialtieComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private doctorService: DoctorService, private router: Router) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    if (!this.doctorService.specialtyToUpdate.id) {
      this.router.navigate(["/admin", "specialties"]);
    }
    this.signupForm.patchValue({
      name: this.doctorService.specialtyToUpdate.name
    });
  }

  onSubmit() {
    let specialty: SpecialtyDTO = new SpecialtyDTO();
    specialty.id = this.doctorService.specialtyToUpdate.id;
    specialty.name = <string>(<any>this.signupForm.get("name").value);

    this.doctorService.putSpecialty(specialty).subscribe(result => {
      this.doctorService.specialtyToUpdate.name = "";
      this.doctorService.specialtyToUpdate.id = 0;

      this.router.navigate(["/admin", "specialties"]);
    });
    console.log(specialty);
    //this.signupForm.reset();
  }
}
