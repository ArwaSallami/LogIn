import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Expedition} from '../Models/expedition';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = environment.backEndUrl;
  constructor(private http: HttpClient) { }

  updateUser(data) {
    return this.http.patch(this.url  + '/api/v1/secured/vitrine/client/update' , data);
  }
  updatePassword(data) {
    return this.http.put(this.url + '/api/v1/secured/vitrine/client/change-password', data);
  }
  getFinishedExpeditions(): Observable<Expedition [] | null> {
    return this.http.get<Expedition[] | null>(this.url + '/api/v1/secured/vitrine/client/finishedExpeditions').pipe(map(response => response['payload'].map(res => new Expedition().deserializable(res)) ));
  }
  getFinishedReceivedExpeditions(): Observable<Expedition [] | null > {
    return this.http.get<Expedition[] | null>(this.url + '/api/v1/secured/vitrine/client/finished-received-expeditions').pipe(map( response => response['payload'].map(res => new Expedition().deserializable(res))));
  }
  getInProgressExpeditions(): Observable<Expedition[] | null> {
    return this.http.get<Expedition [] | null>(this.url + '/api/v1/secured/vitrine/client/inProgressExpeditions ').pipe(map(response => response['payload'].map(res => new Expedition().deserializable(res)) ));
  }
  getInProgressReceivedExpeditions(): Observable<Expedition[] | null> {
    return this.http.get<Expedition [] | null>(this.url + '/api/v1/secured/vitrine/client/inProgress-received-expeditions').pipe(map( response => response['payload'].map(res => new Expedition().deserializable(res))));
  }
  getExpeditionNbrByStatus(status: string): Observable<number> {
    const params = new HttpParams().set('status', status);
    return this.http.get(this.url + '/api/v1/secured/vitrine/client/expeditionscountbystatus', {params: params}).pipe(map(response => response['payload']));
  }
  getAllUserExpedition(): Observable<Expedition [] | null> {
    return this.http.get<Expedition [] | null>(this.url + '/api/v1/secured/vitrine/client/expeditions').pipe(map(response => response['payload'].map(res => new Expedition().deserializable(res)) ));
  }
  updateProData(data) {
    return this.http.put(this.url + '/api/v1/secured/vitrine/client/update-pro-data', data);
  }
  addReclamation(data) {
    return this.http.post(this.url + '/api/v1/secured/vitrine/client/reclamations', JSON.stringify(data));
  }
  // getExpeditionNbrByStatus(status: string) : Observable<Number> {
  //   return this.http.get(this.url + '/api/v1/secured/vitrine/client/expeditionscountbystatus').pipe(map( response => response['payload']));
  // }
}
