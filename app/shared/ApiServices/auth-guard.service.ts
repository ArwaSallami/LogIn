import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {HttpErrorResponse, HttpEvent, HttpResponse} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {container} from '@angular/core/src/render3';
import {User} from '../Models/user';
import {promise} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {

  }

   canActivate(route, state: RouterStateSnapshot): Observable<any> {

    return this.authService.getUser().pipe(map(response => {
      return true;
    }), catchError((error: Response) => {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
       return throwError('login');

    }));

  }

}
