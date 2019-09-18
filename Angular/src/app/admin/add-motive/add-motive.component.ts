import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DoctorService } from "src/app/services/doctor.service";
import { Router } from "@angular/router";
import { SpecialtyDTO } from "src/app/model/SpecialtyDTO";
import { MotiveDTO } from "src/app/model/MotiveDTO";
import { MotiveCreateDTO } from "src/app/model/MotiveCreateDTO";

@Component({
  selector: "app-add-motive",
  templateUrl: "./add-motive.component.html",
  styleUrls: ["./add-motive.component.css"]
})
export class AddMotiveComponent implements OnInit {
  signupForm: FormGroup;
  specialties: SpecialtyDTO[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      motiveName: new FormControl(null, Validators.required),
      specialtyName: new FormControl(null, Validators.required)
    });
    this.doctorService.getSpecialties().subscribe(specialties => {
      this.specialties = specialties;
    });

    // this.signupForm.patchValue({
    //   name: "anna"
    // });
  }

  onSubmit() {
    let motive: MotiveCreateDTO = new MotiveCreateDTO();
    motive.specialty = new SpecialtyDTO();
    motive.id = 0;
    motive.name = <string>(<any>this.signupForm.get("motiveName").value);
    motive.specialty.name = <string>(
      (<any>this.signupForm.get("specialtyName").value)
    );

    this.doctorService.postMotive(motive).subscribe(result => {
      this.router.navigate(["/admin", "motives"]);
    });
    //  console.log(motive);
    //this.signupForm.reset();
  }
}
