import { Component, OnInit } from "@angular/core";
import { MotiveDTO } from "src/app/model/MotiveDTO";
import { DoctorService } from "src/app/services/doctor.service";
import { Router } from "@angular/router";
import { DoctorMotiveDTO } from "src/app/model/DoctorMotiveDTO";

@Component({
  selector: "app-list-motives",
  templateUrl: "./list-motives.component.html",
  styleUrls: ["./list-motives.component.css"]
})
export class ListMotivesComponent implements OnInit {
  motives: MotiveDTO[];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit() {
    this.doctorService.getMotives().subscribe(motives => {
      this.motives = motives;
    });
  }
  onClickNaveToUpdate(id, name) {
    let motive: DoctorMotiveDTO = new DoctorMotiveDTO();
    motive.name = name;
    motive.id = id;
    this.doctorService.motiveToUpdate = motive;
    console.log(this.doctorService.motiveToUpdate);
    this.router.navigate(["/admin", "motives", "update"]);
  }

  onClickDelete(id: number) {
    this.doctorService.deleteMotives(id).subscribe(result => {
      for (let i in this.motives) {
        if (this.motives[i].id == id)
          this.motives = this.motives.slice(parseInt(i), 1);
      }
    });
    console.log(id);
  }

  onClickNave() {
    this.router.navigate(["/admin", "motives", "add"]);
  }
}
