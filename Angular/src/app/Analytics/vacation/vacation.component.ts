import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from '../../services/analytics.service';
import {Chart} from 'chart.js';
import {JObject} from '../../model/jobject';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  day: string = '2018-12-26';
  option: string = 'day';
  chart: Chart;
  chart1: Chart;
  days = [];
  datasOpen = [];
  datasUsed = [];


  constructor(public analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.analyticsService.getVacationPerDayChoosen(this.day)
      .subscribe(data => this.success(data), err => console.log(err));

  }

  private success(data: JObject[]) {
    this.datasOpen.push(Number(data[2].value));
    this.datasUsed.push(Number(data[1].value));
    if (this.chart != undefined)
      this.chart.destroy();
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.days,
        datasets: [
          {
            label: 'Open slots',
            data: this.datasOpen,
            backgroundColor: '#D6E9C6' // green
          },
          {
            label: 'Used slots',
            data: this.datasUsed,
            backgroundColor: '#FAEBCC' // yellow
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{stacked: true}],
          yAxes: [{stacked: true}]
        }
      }
    });
    //this.chart.update();
    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          {
            label: 'Open slots',
            data: this.datasOpen,
            backgroundColor: '#D6E9C6' // green
          },
          {
            label: 'Used slots',
            data: this.datasUsed,
            backgroundColor: '#FAEBCC' // yellow
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{stacked: true}],
          yAxes: [{stacked: true}]
        }
      }
    });
  }

  onChange() {

    this.days = [];
    this.datasOpen = [];
    this.datasUsed = [];
    if (this.option == 'day') {
      this.days.push(this.day);
      this.analyticsService.getVacationPerDayChoosen(this.day)
        .subscribe(data => this.success(data), err => console.log(err));
    }
    if (this.option == 'week') {
      let startDate = new Date(this.day);
      let endDate = VacationComponent.addDays(startDate, 7);
      for (let d = startDate; d < endDate; d = VacationComponent.addDays(d, 1)) {
        this.days.push(VacationComponent.formatDate(d));
        this.analyticsService.getVacationPerDayChoosen(VacationComponent.formatDate(d))
          .subscribe(data => this.success(data), err => console.log(err));
      }
    }
    if (this.option == 'month') {
      let startDate = new Date(this.day);
      let endDate = VacationComponent.addDays(startDate, 30);
      for (let d = startDate; d < endDate; d = VacationComponent.addDays(d, 1)) {
        this.days.push(VacationComponent.formatDate(d));
        this.analyticsService.getVacationPerDayChoosen(VacationComponent.formatDate(d))
          .subscribe(data => this.success(data), err => console.log(err));
      }
    }
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  static addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


}
