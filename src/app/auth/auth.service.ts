import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  public errorMessage: any = {}
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + 'AccountApi', { username, password })
      .pipe(
        tap((response: any) => {
          sessionStorage.setItem('userInfo', JSON.stringify(response));
          sessionStorage.setItem('authToken', response.token);
          //localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']);
          // optional usage
          // console.log(response);
        })
      );
  }
  logout() {
    sessionStorage.clear();
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
  // refreshToken() {
  //   const refreshToken = sessionStorage.getItem('authToken');

  //   return this.http.post<any>(
  //     `${this.baseUrl}auth/refresh-token`,
  //     { refreshToken }
  //   ).pipe(
  //     map(res => {
  //       sessionStorage.setItem('authToken', res.accessToken);
  //       return res.accessToken;
  //     })
  //   );
  // }
  getAccessToken(): string | null {
    var to=sessionStorage.getItem('authToken')
    return sessionStorage.getItem('authToken');
  }
}
