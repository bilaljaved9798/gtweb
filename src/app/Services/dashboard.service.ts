import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Dashboardservices {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getDefultDashboards() {
    //const token = sessionStorage.getItem('authToken') // or wherever you store it
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(
      `${this.baseUrl}DashBoardApi/GetDefaultPageData?userid=160`);
  }
}


