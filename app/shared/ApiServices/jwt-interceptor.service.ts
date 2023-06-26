import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {LocationStrategy} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private router: Router, private state: ActivatedRoute) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const route = this.state.snapshot['_routerState'].url;
    let token = localStorage.getItem('token');
    if(token) {
      const cloned = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
      return next.handle(cloned).pipe(tap( (event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          //
        }
      },
        (error: any) => {
        if(error instanceof HttpErrorResponse ){
          if ((error.status === 401) && ((error.error['message'] === 'Expired JWT Token') || error.error['message'] === 'Invalid JWT Token')) {
            localStorage.removeItem('token');
            this.router.navigate(['/login'],{ queryParams: {returnUrl: route}});
          }
        }
        }));
    } else {
      return next.handle(req).pipe(tap((event: HttpEvent<any>) => {

      },(error: any) => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === 401 && error.error['message'] === 'JWT Token not found') {
            if( route !== '') {
              this.router.navigate(['/login'], {queryParams: {returnUrl: route}});
            }
            return false;
          }
        }
      }));
    }
  }

}
