import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DoctolibDoctor} from '../model/doctolib-doctor';

@Injectable()
export class DoctolibService {
  url: string = 'http://localhost:8089/Epione-web/rest/doctolib';

  constructor(private httpClient: HttpClient) {
  }

  getDoctolibDoctors(): Observable<DoctolibDoctor[]> {
    return this.httpClient.get<DoctolibDoctor[]>(this.url);
  }

  getDoctolibDoctorsFirstLettre(id: string): Observable<DoctolibDoctor[]> {
    return this.httpClient.get<DoctolibDoctor[]>(this.url + '/' + id);
  }

  getDoctolibDoctorByPath(id: string): Observable<DoctolibDoctor> {
    return this.httpClient.get<DoctolibDoctor>(this.url + '/path/' + id);
  }

  checkPath(id: string) {
    return this.httpClient.get<boolean>(this.url + '/checkpath/' + id);
  }

  addDoctolibDoctor(doctor: DoctolibDoctor) {
    return this.httpClient.post<DoctolibDoctor>(this.url + '/addDoctor/', doctor);
  }
}
