import { Component, OnInit } from "@angular/core";

import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { DoctorService } from "src/app/services/doctor.service";
import { SpecialtyDTO } from "src/app/model/SpecialtyDTO";
@Component({
  selector: "app-add-specialtie",
  templateUrl: "./add-specialtie.component.html",
  styleUrls: ["./add-specialtie.component.css"]
})
export class AddSpecialtieComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private doctorService: DoctorService, private router: Router) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
    // this.signupForm.patchValue({
    //   name: "anna"
    // });
  }

  onSubmit() {
    let specialty: SpecialtyDTO = new SpecialtyDTO();
    specialty.id = 0;
    specialty.name = <string>(<any>this.signupForm.get("name").value);

    this.doctorService.postSpecialty(specialty).subscribe(result => {
      this.router.navigate(["/admin", "specialties"]);
    });
    //  console.log(specialty);
    //this.signupForm.reset();
  }
}
