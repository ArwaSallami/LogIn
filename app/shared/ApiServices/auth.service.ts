import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, throwError} from 'rxjs';
import {User} from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.backEndUrl;
  constructor(private http: HttpClient, private router: Router) { }

  registration(data) {
    return this.http.post(this.url + '/api/v1/vitrine/security/register', JSON.stringify(data));
  }
  login(data) {
    return this.http.post(this.url + '/api/v1/vitrine/security/login-check', JSON.stringify(data))
      .pipe(
        map(response => {
          let token = response['payload'].token;
          localStorage.setItem('token', token);
        }));
  }
  logout(route?: string) {
    localStorage.removeItem('token');
    if (route)
      return this.router.navigate([route]);
    return this.router.navigate(['/']);

  }
  isLoggedIn(){
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if(!token)
    {
      return false;
    }

    try {

      if (!jwtHelper.isTokenExpired(token)) {
        this.getUser().subscribe(response => {let user = response});
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;

    }
  }
  confirmation(token: string) {
    return this.http.get(this.url + '/api/v1/vitrine/security/confirm-registration?token=' + token);
  }
  requestResetPassword(email) {
    return this.http.get(this.url + '/api/v1/vitrine/security/request-password?email=' + email);
  }
  resetPassword(data, token: string) {
    return this.http.post(this.url + '/api/v1/vitrine/security/reset-password?token=' + token, JSON.stringify(data));
  }
  getUser(){
    return  this.http.get(this.url + '/api/v1/secured/vitrine/client/me');
  }

  getStatistics(startDate,endDate){
    return  this.http.get(this.url + '/api/v1/secured/vitrine/client/get-statistics?startDate='+startDate+'&endDate='+endDate);
    
  }
  getCurrentUser(): Observable<User | undefined> {
    return this.http.get<User>(this.url + '/api/v1/secured/vitrine/client/me').pipe(map(data => new User().deserializable(data['payload'])));
  }
  getTokenUser() {
    let token = localStorage.getItem('token');
    if( !token){
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }


}
