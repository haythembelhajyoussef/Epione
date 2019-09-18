import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from '../../services/analytics.service';


@Component({
  selector: 'app-home-a',
  templateUrl: './home-a.component.html',
  styleUrls: ['./home-a.component.css']
})
export class HomeAComponent implements OnInit {


  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit() {

  }


}
