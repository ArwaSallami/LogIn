import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/ApiServices/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {DataService} from '../../shared/helpers/data.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  routePath: string;
  token: string;
  error: boolean;
  isSubmitting = false;
  errorMsg;
  resetresponseMsg;
  formRequest;
  formReset;
  dataMessage: string;
  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private data: DataService,
              fb: FormBuilder ) {
    this.formRequest = fb.group({
      email: ['', [
        Validators.required
      ]]
    }) ;
    this.formReset = fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      retypePassword: ['', [
        Validators.required,
          Validators.minLength(8)
      ]]
    });
  }
  get email() {
    return this.formRequest.get('email');
  }
  get newPassword() {
    return this.formReset.get('newPassword');
  }
  get retypePassword() {
    return this.formReset.get('retypePassword');
  }

    ngOnInit() {
        this.data.currentMessage.subscribe(message => this.dataMessage = message);
      if (this.authService.isLoggedIn()) {
        return this.router.navigate(['/']);
      }
    this.routePath = this.router.url;
    if(this.routePath !== '/password/reset-request' ){
      this.token = this.route.snapshot.paramMap.get('token');
      if(!this.token)
        this.error = true;

    }
  }
  onRequest() {

    this.isSubmitting = true;
    this.authService.requestResetPassword(this.email.value).subscribe(response => {
      this.errorMsg = '';
      this.resetresponseMsg = 'Un mail de récupération vous a été envoyé.';
      console.log(this.resetresponseMsg);
       this.isSubmitting = false;
        },
      error => {
      // console.log(error);
      // this.errorMsg = error.error.message;
      if (error.error.code === 404) {
          this.errorMsg = 'Adresse e-mail inexistante';
      } else {
        this.errorMsg = 'Une erreur technique est survenue, essayez plus tard.';
      }
        this.isSubmitting = false;
      });

  }
  onReset() {
    this.isSubmitting = true;
    this.authService.resetPassword(this.formReset.value, this.token).subscribe( response => {
      this.errorMsg = '';
      this.resetresponseMsg = 'Votre mot de passe à été changé avec succès';
      this.isSubmitting = false;
      this.data.changeMessage(this.resetresponseMsg);
      this.router.navigateByUrl('/login');
    },
      error => {
      // console.log(error);
      if (error.error.code === 401) {
        this.errorMsg = 'Session expirée, veuillez relancer votre demande';
      } else {
        this.errorMsg = 'Une erreur technique est survenue, essayez plus tard';
      }
      // this.errorMsg = error.error.message;
      this.isSubmitting = false;
      });

  }

}
