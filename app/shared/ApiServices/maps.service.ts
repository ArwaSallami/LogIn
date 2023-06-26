import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Relypoints} from '../Models/relypoints';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MapsService {


  private url = environment.backEndUrl;
  constructor( private http: HttpClient) { }


  getlocation(): Observable<Relypoints []>{
    return this.http.get<Relypoints[]>(this.url + '/api/v1/vitrine/all-point-relais');
  }
}
