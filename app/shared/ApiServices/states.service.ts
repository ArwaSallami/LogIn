import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {States} from './states';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private statesUrl = environment.backEndUrl + '/api/v1/vitrine/all-delegation';

  constructor(private http: HttpClient) { }
  getStates(): Observable<States[]> {
    return this.http.get<States[]>(this.statesUrl);
  }
}
