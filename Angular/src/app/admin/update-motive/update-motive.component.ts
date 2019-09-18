import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DoctorService } from "src/app/services/doctor.service";
import { Router } from "@angular/router";
import { DoctorMotiveDTO } from "src/app/model/DoctorMotiveDTO";

@Component({
  selector: "app-update-motive",
  templateUrl: "./update-motive.component.html",
  styleUrls: ["./update-motive.component.css"]
})
export class UpdateMotiveComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private doctorService: DoctorService, private router: Router) {}
  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    if (!this.doctorService.motiveToUpdate.id) {
      this.router.navigate(["/admin", "motives"]);
    }
    this.signupForm.patchValue({
      name: this.doctorService.motiveToUpdate.name
    });
  }

  onSubmit() {
    let motive: DoctorMotiveDTO = new DoctorMotiveDTO();
    motive.id = this.doctorService.motiveToUpdate.id;
    motive.name = <string>(<any>this.signupForm.get("name").value);

    this.doctorService.putMotive(motive).subscribe(result => {
      this.doctorService.motiveToUpdate.name = "";
      this.doctorService.motiveToUpdate.id = 0;

      this.router.navigate(["/admin", "motives"]);
    });
    console.log(motive);
    //this.signupForm.reset();
  }
}
