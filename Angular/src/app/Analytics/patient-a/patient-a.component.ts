import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from '../../services/analytics.service';
import {JObjectPatient} from '../../model/jobject-patient';
import * as $ from 'jquery';
import {JObject} from '../../model/jobject';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-patient-a',
  templateUrl: './patient-a.component.html',
  styleUrls: ['./patient-a.component.css']
})
export class PatientAComponent implements OnInit {
  patient1: JObjectPatient = new JObjectPatient();
  patient2: JObjectPatient = new JObjectPatient();
  patient3: JObjectPatient = new JObjectPatient();
  chart = [];
  ages = [];
  vals = [];
  chart1 = [];
  chart2 = [];
  labelPie = [];
  datasPie = [];

  constructor(public analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.analyticsService.getTop3Patient()
      .subscribe(data => this.successTop3(data), err => console.log(err));
    this.analyticsService.getNumberPatientPerAge()
      .subscribe(data1 => this.successPerAge(data1), err => console.log(err));
    this.analyticsService.getNumberPatientPerGender()
      .subscribe(data2 => this.successPerGender(data2), err => console.log(err));
  }

  private successTop3(data: JObjectPatient[]) {
    this.patient1 = data[0];
    this.patient2 = data[1];
    this.patient3 = data[2];
  }


  private successPerAge(data1: JObject[]) {
    data1.forEach(res => {
      this.ages.push(Number(res.key));
      this.vals.push(Number(res.value));
    });

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.ages,
        datasets: [{
          label: 'Age',
          backgroundColor: 'orange',
          borderColor: 'orange',
          data: this.vals,
          type: 'line',
          pointRadius: 0,
          fill: true,
          lineTension: 0,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Patient age',
          fontSize: 15
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            distribution: 'series',
            ticks: {
              source: 'labels'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Age'
            }
          }]
        }
      }
    });
  }

  private successPerGender(data2: JObject[]) {
    this.labelPie.push(data2[0].key);
    this.labelPie.push(data2[1].key);
    this.datasPie.push(Math.round((Number(data2[0].value) / Number(data2[2].value)) * 100));
    this.datasPie.push(Math.round((Number(data2[1].value) / Number(data2[2].value)) * 100));
    console.log(this.datasPie);
    this.chart1 = new Chart('canvas1', {
      type: 'pie',
      data: {
        labels: this.labelPie,
        datasets: [
          {
            data: this.datasPie,
            fill: true,
            backgroundColor: [
              '#DC7633',
              '#3498DB',
            ]
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Average patient gender',
          fontSize: 15
        },
        legend: {
          display: true
        },
      }
    });
  }

  onFinished() {
    $('.bronze .podium').animate({
      'height': '62px'
    }, 1500);
    $('.gold .podium').animate({
      'height': '165px'
    }, 1500);
    $('.silver .podium').animate({
      'height': '106px'
    }, 1500);
    $('.competition-container .name').delay(1000).animate({
      'opacity': '1'
    }, 500);
  }
}
