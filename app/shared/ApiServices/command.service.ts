import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {stringify} from 'querystring';
import {Observable} from 'rxjs';
import {Price} from '../Models/price';
import {map} from 'rxjs/operators';
import {Expedition} from '../Models/expedition';
import {PackagingCategorie} from '../Models/packagingCategorie';
import {DiscountCodes} from '../Models/discountCodes';
import {Reclamation} from '../Models/reclamation';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private url = environment.backEndUrl;
  constructor(private  http: HttpClient) { }

  addNewExpedition(data) {
    return this.http.post(this.url + '/api/v1/commande/new-commande', JSON.stringify(data));
  }
  deleteExpedition(data) {
    const params = new HttpParams().set('publicCode', data);
    return this.http.delete(this.url + '/api/v1/commande/delete-commande', {params: params});
  }
  expeditionConfirme(data) {
    const params = new HttpParams().set('publicCode', data);
    return this.http.patch(this.url + '/api/v1/commande/commande-confiramtion', {params: params});
  }
  delteExpeditionAdress(data) {
    const params = new HttpParams().set('publicCode', data);
    return this.http.delete(this.url + '/api/v1/commande/delete-commande-addresses', {params: params});
  }
  addAddresses(data) {
    return this.http.post(this.url  +  '/api/v1/commande/add-addresses', JSON.stringify(data));
  }
  getExpedition(data): Observable<Expedition | undefined>{
    const params = new  HttpParams().set('publicCode', data);
    return this.http.get<Expedition>(this.url + '/api/v1/commande/expedition', {params  : params}).pipe(map(response => new Expedition().deserializable(response['payload'])));
  }
  getPrices(data): Observable<Price | undefined>{
    const params = new HttpParams().set('publicCode', data);
    return this.http.get<Price>(this.url + '/api/v1/simulator' , {params : params}).pipe(map( response => new Price().deserializable(response['payload'])));
  }
  getAssurencePrice(data) {
    const params = new HttpParams().set('amount', data);
    return this.http.get(this.url + '/api/v1/commande/assurence', {params: params});
  }
  updateExpedition(data) {
    return this.http.patch(this.url + '/api/v1/commande/update-commande', data);
  }
  getPackagingType(){
    return this.http.get(this.url + '/api/v1/commande/packagingCategory' );
  }
  getDiscountCode(data): Observable<DiscountCodes | undefined>{
    const params = new HttpParams().set('code', data);
    return this.http.get(this.url + '/api/v1/discountCodes', {params: params}).pipe(map(response => new DiscountCodes().deserializable(response['payload'])));
  }
  generateBillingPdf(data){
    const params = new HttpParams().set('publicCode', data);
    const httpOptions = new HttpHeaders({
        'Accept': 'application/pdf',
        'Content-Type': 'application/pdf'
      }  )
    ;
    return this.http.get(this.url + '/api/v1/commande/billing', {params: params, headers: httpOptions, responseType: 'blob'});
  }
  generateBordereauPdf(data) {
    const params = new HttpParams().set('publicCode', data);
    const  httpOptions = new HttpHeaders( {
      'Accept': 'application/pdf',
      'Content-Type': 'application/pdf'
    });
    return this.http.get(this.url + '/api/v1/commande/bordereau', {params: params, headers: httpOptions, responseType: 'blob'});
  }
  getAllReclamation(): Observable<Reclamation[] | null> {
    return this.http.get<Reclamation [] | null>(this.url + '/api/v1/secured/vitrine/client/reclamations').pipe(map(response => response['payload'].map(res => new Reclamation().deserializable(res))));
  }
  getPaymentInterface(data) {
    const d1 = new Date();
    let d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() + 20);
    console.log(d2.toISOString());
   // return this.http.get(environment.clickToPay.urlTest + '?amount=' + data.totalIncVat * 1000 + '&currency=788&language=en&orderNumber=' + data.publicCode + '&password=' + environment.clickToPay.password + '&returnUrl=finish.html&userName=' + environment.clickToPay.username + '&jsonParams={"orderNumber":"1234568"}&expirationDate=' + d2.toISOString());
    let query = {
      publicCode: data.publicCode,
      expirationDate: d2.toISOString()
    };
    return this.http.post(this.url + '/api/v1/commande/new-transaction', JSON.stringify(query));
  }
  checkPayment(data) {
    let query = {
      publicCode: data,
    };
    return this.http.post(this.url + '/api/v1/commande/check-transaction', JSON.stringify(query));
  }
}
