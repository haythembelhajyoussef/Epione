import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from '../../services/analytics.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-appointment-a',
  templateUrl: './appointment-a.component.html',
  styleUrls: ['./appointment-a.component.css']
})
export class AppointmentAComponent implements OnInit {
  colors = {
    green: {
      fill: '#e0eadf',
      stroke: '#5eb84d',
    },
    lightBlue: {
      stroke: '#6fccdd',
    },
    darkBlue: {
      fill: '#92bed2',
      stroke: '#3282bf',
    },
    purple: {
      fill: '#8fa8c8',
      stroke: '#75539e',
    },
  };

  treated: number[];
  cancelled: number[];
  pending: number[];
  chart: Chart;
  treatedY: number[];
  cancelledY: number[];
  pendingY: number[];
  chart1: Chart;

  constructor(public analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.analyticsService.getNumberAppointmentThisWeek()
      .subscribe(data => this.successLine(data), err => console.log(err));
    this.analyticsService.getMonthlyAverageAppointment()
      .subscribe(data1 => this.successLine1(data1), err => console.log(err));
  }

  private successLine(data: Map<string, number[]>) {
    this.pending = data['Pending'];
    this.cancelled = data['Cancelled'];
    this.treated = data['Treated'];
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Treated',
          fill: true,
          backgroundColor: this.colors.purple.fill,
          pointBackgroundColor: this.colors.purple.stroke,
          borderColor: this.colors.purple.stroke,
          pointHighlightStroke: this.colors.purple.stroke,
          borderCapStyle: 'butt',
          data: this.treated,

        }, {
          label: 'Cancelled',
          fill: true,
          backgroundColor: this.colors.darkBlue.fill,
          pointBackgroundColor: this.colors.darkBlue.stroke,
          borderColor: this.colors.darkBlue.stroke,
          pointHighlightStroke: this.colors.darkBlue.stroke,
          borderCapStyle: 'butt',
          data: this.cancelled,
        }, {
          label: 'Pending',
          fill: true,
          backgroundColor: this.colors.green.fill,
          pointBackgroundColor: this.colors.lightBlue.stroke,
          borderColor: this.colors.lightBlue.stroke,
          pointHighlightStroke: this.colors.lightBlue.stroke,
          borderCapStyle: 'butt',
          data: this.pending,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Number appointment during this week',
          fontSize: 15
        },
        scales: {
          yAxes: [{
            stacked: true,
          }]
        },
        animation: {
          duration: 750,
        },
      }
    });
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.push('data');
    });
  }

  private successLine1(data1: Map<string, number[]>) {
    this.pendingY = data1['Pending'];
    this.cancelledY = data1['Cancelled'];
    this.treatedY = data1['Treated'];
    this.chart1 = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Treated',
          data: this.treatedY,
          fill: false,
          backgroundColor: this.colors.purple.fill,
          borderColor: this.colors.purple.stroke,

        }, {
          label: 'Cancelled',
          data: this.cancelledY,
          fill: false,
          backgroundColor: this.colors.green.fill,
          borderColor: this.colors.green.stroke,
        }, {
          label: 'Pending',
          data: this.pendingY,
          fill: false,
          backgroundColor: this.colors.darkBlue.fill,
          borderColor: this.colors.darkBlue.stroke,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Monthly Average Appointment',
          fontSize: 15
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        },
        animation: {
          duration: 750,
        },
      }
    });
  }
}
