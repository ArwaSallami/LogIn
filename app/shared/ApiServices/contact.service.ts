import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Contact} from "../Models/contact";
import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: "root" })

export class ContactService {
    private url = environment.backEndUrl;
    apiURL: string = this.url + '/api/v1/vitrine/support/contact';
    constructor(private http: HttpClient) {}

    public sendContact(contactObj: Contact): Observable<Contact> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type':  'application/json'
            })
        };
        return this.http.post<Contact>(this.apiURL, contactObj, httpOptions);
    }
    public getConfig() {
        return this.http.get(this.apiURL);
    }
}
