import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from '../../services/analytics.service';
import {JObject} from '../../model/jobject';
import {formatDate} from '@angular/common';
import {JObjectPatient} from '../../model/jobject-patient';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vacationToDay: JObject = new JObject();
  vacationToDay1: JObject = new JObject();
  vacationToDay2: JObject = new JObject();
  today: Date = new Date();
  day: string;
  day1: string;
  day2: string;

  next5patients: JObjectPatient[];
  data: JObject[];
  chart: Chart;
  chart1: Chart;
  days = [];
  occur = [];
  labelPi = [];
  datasPie = [];
  times: JObject[] = [];
  ds: JObject[];
  occ: boolean = true;
  messageSuggest: string;
  maxDay = [];
  minDay = [];
  percentageMax: number;
  percentageMin: number;

  constructor(private analyticsService: AnalyticsService) {
    this.day = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.today.setDate(this.today.getDate() + 1);
    this.day1 = formatDate(this.today, 'yyyy-MM-dd', 'en');
    this.today.setDate(this.today.getDate() + 1);
    this.day2 = formatDate(this.today, 'yyyy-MM-dd', 'en');
    this.analyticsService.getVacationPerDay(this.day).subscribe(data => this.vacationToDay = data[0]);
    this.analyticsService.getVacationPerDay(this.day1).subscribe(data => this.vacationToDay1 = data[0]);
    this.analyticsService.getVacationPerDay(this.day2).subscribe(data => this.vacationToDay2 = data[0]);

  }

  ngOnInit() {
    this.analyticsService.getNext5Patient().subscribe(data => this.next5patients = data);
    this.analyticsService.getPercentagePerStatus()
      .subscribe(dataPie => this.successPie(dataPie), err => console.log(err));
    this.analyticsService.getMostDayOccured()
      .subscribe(data => this.successLine(data), err => console.log(err));
    this.analyticsService.getMostTimeOccured()
      .subscribe(data => this.times = data);

  }

  successLine(data: JObject[]) {
    this.ds = data;
    data.forEach(res => {
      this.days.push(res.key);
      this.occur.push(Number(res.value));
    });
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          {
            data: this.occur,
            borderColor: '#3cba9f',
            fill: false
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  successPie(dataPie: JObject[]) {
    dataPie.forEach(res => {
      this.labelPi.push(res.key);
      this.datasPie.push(Math.round(Number(res.value)));
    });
    this.chart1 = new Chart('canvas1', {
      type: 'doughnut',
      data: {
        labels: this.labelPi,
        datasets: [
          {
            data: this.datasPie,
            fill: true,
            backgroundColor: [
              '#DC7633',
              '#3498DB',
              '#F4D03F',
            ]
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
      }
    });
  }

  mostTime() {
    this.occ = false;
    this.days.splice(0, this.days.length);
    this.occur.splice(0, this.occur.length);
    this.times.forEach(res => {
      this.days.push(res.key);
      this.occur.push(Number(res.value));
    });
    this.chart.update();
  }

  mostDay() {
    this.occ = true;
    this.days.splice(0, this.days.length);
    this.occur.splice(0, this.occur.length);
    this.ds.forEach(res => {
      this.days.push(res.key);
      this.occur.push(Number(res.value));
    });
    this.chart.update();
  }

  suggest() {
    this.minDay = [];
    this.maxDay = [];
    let max: number = Number(this.ds[0].value);
    let min: number = Number(this.ds[0].value);
    this.ds.forEach(e => {
      if (max < Number(e.value)) {
        max = Number(e.value);
        this.maxDay[0] = e.key;
      }
      if (min > Number(e.value)) {
        min = Number(e.value);
        this.minDay[0] = e.key;
      }
    });
    this.ds.forEach(e => {
      if (max <= Number(e.value)) {
        max = Number(e.value);
        this.maxDay.push(e.key);
      }
      if (min >= Number(e.value) && this.minDay[0] != e.key) {
        min = Number(e.value);
        this.minDay.push(e.key);
      }
    });
    this.messageSuggest = 'We suggest you to work <b>' + this.maxDay + '</b> full time ' + 'And if you want to get a vacation we suggest you to get it <b>' + this.minDay + '</b>';
    // this.messageSuggest = this.messageSuggest.replace(',', ' or/and ');

  }
}
