import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Faq} from './faq';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private  url = environment.backEndUrl;

  constructor(private http: HttpClient) { }

  getAllFaq(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.url + '/api/v1/common/faq/all').pipe(map(data => data['payload']));
  }
}
