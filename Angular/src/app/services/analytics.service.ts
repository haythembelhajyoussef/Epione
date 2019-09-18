import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JObject} from '../model/jobject';
import {JObjectPatient} from '../model/jobject-patient';
import {formatDate} from '@angular/common';

@Injectable()
export class AnalyticsService {
  url: string = 'http://localhost:8089/Epione-web/rest/analytics/';
  vacationToDay: JObject = new JObject();
  vacationToDay1: JObject = new JObject();
  vacationToDay2: JObject = new JObject();
  today: Date = new Date();
  day: string;
  day1: string;
  day2: string;

  constructor(private httpClient: HttpClient) {
    this.day = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.today.setDate(this.today.getDate() + 1);
    this.day1 = formatDate(this.today, 'yyyy-MM-dd', 'en');
    this.today.setDate(this.today.getDate() + 1);
    this.day2 = formatDate(this.today, 'yyyy-MM-dd', 'en');
    this.getVacationPerDay(this.day).subscribe(data => this.vacationToDay = data[0]);
    this.getVacationPerDay(this.day1).subscribe(data => this.vacationToDay1 = data[0]);
    this.getVacationPerDay(this.day2).subscribe(data => this.vacationToDay2 = data[0]);

  }

  getVacationPerDay(day: string): Observable<JObject> {
    return this.httpClient.get<JObject>(this.url + 'next/3/day/' + day);
  }

  getNext5Patient(): Observable<JObjectPatient[]> {
    return this.httpClient.get<JObjectPatient[]>(this.url + 'next5Patient/3');
  }

  getMostDayOccured(): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + 'most/3');
  }

  getMostTimeOccured(): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + 'mosttime/3');
  }

  getPercentagePerStatus(): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + 'cancel/3');
  }

  getNumberAppointmentThisWeek(): Observable<Map<string, number[]>> {
    return this.httpClient.get<Map<string, number[]>>(this.url + 'AppointmentThisWeek/3');
  }

  getMonthlyAverageAppointment(): Observable<Map<string, number[]>> {
    return this.httpClient.get<Map<string, number[]>>(this.url + 'AppointmentPerYear/3');
  }

  getTop3Patient(): Observable<JObjectPatient[]> {
    return this.httpClient.get<JObjectPatient[]>(this.url + 'patientOfTheMonth/3');
  }

  getNumberPatientPerAge(): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + 'numberPatientPerAge/3');
  }

  getNumberPatientPerGender(): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + 'AveragePatientGender/3');
  }

  getVacationPerDayChoosen(day: string): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + '3/day/' + day);
  }

  getPatientPerAddress(day: string): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + 'PatientPerAddress/3' + day);
  }

  getPatientPerAddressTop5(day: string): Observable<JObject[]> {
    return this.httpClient.get<JObject[]>(this.url + 'PatientPerAddressTop5/3' + day);
  }
}
