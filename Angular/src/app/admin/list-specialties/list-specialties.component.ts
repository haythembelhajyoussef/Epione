import { Component, OnInit } from "@angular/core";
import { DoctorService } from "src/app/services/doctor.service";
import { DoctorDTO } from "src/app/model/DoctorDTO";
import { SpecialtyDTO } from "src/app/model/SpecialtyDTO";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-specialties",
  templateUrl: "./list-specialties.component.html",
  styleUrls: ["./list-specialties.component.css"]
})
export class ListSpecialtiesComponent implements OnInit {
  specialties: SpecialtyDTO[];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit() {
    this.doctorService.getSpecialties().subscribe(specialties => {
      this.specialties = specialties;
    });
  }
  onClickNaveToUpdate(id, name) {
    let specialty: SpecialtyDTO = new SpecialtyDTO();
    specialty.name = name;
    specialty.id = id;
    this.doctorService.specialtyToUpdate = specialty;
    this.router.navigate(["/admin", "specialties", "update"]);
  }
  onClickNave() {
    this.router.navigate(["/admin", "specialties", "add"]);
  }
}
