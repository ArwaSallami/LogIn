import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/ApiServices/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../shared/helpers/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form;
  errorMsg;
  isSubmitting = false;
  isRegistred;
  isSuccess;
  resetMessage: string;
  constructor(fb: FormBuilder,
              private authService: AuthService,
              private  route: ActivatedRoute,
              private router: Router,
              private data: DataService) {
    this.form = fb.group({
      email: ['', [
        Validators.required, Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.resetMessage = message);
    if (this.authService.isLoggedIn()) {
      return this.router.navigate(['/']);
    }
    this.isRegistred = this.route.snapshot.paramMap.get('isRegistred') ;
    this.isSuccess = this.route.snapshot.paramMap.get('success') ;
  }
  onSubmit() {
    this.isSubmitting = true;
    this.authService.login(this.form.value).subscribe(response => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/dashboard/suivicolis']);

    },
      (error: HttpErrorResponse) => {
      if (error.error.code === 401) {
        this.errorMsg = 'Adresse ou mot de passe invalide';
      } else if (error.error.code === 423) {
          this.errorMsg = 'Compte bloqué ou non activé';
          console.log(error.error);
      } else {
          this.errorMsg = 'Une erreur technique est survenue, Veuillez réessayer ultérieurement';
          console.log(error.error);
      }
      // this.errorMsg = error.error.message;
      // console.log(error.error);
      this.password.setValue('');
      this.isSubmitting = false;
      }
      );

  }

}
