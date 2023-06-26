import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/ApiServices/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MustMatch} from '../../shared/helpers/field-matcher.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form ;
  errorMsg;
  isSubmitting = false;
  cguSubmitted = false;
  selectedType = 'particular';
  selected = true;
  constructor(fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      firstName : ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ]],
      lastName : ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3),
      ]],
      email : ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      plainPassword : ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword : ['', [
          Validators.required,
          Validators.minLength(8)
        ]],
      phoneNumber : ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8)
      ]],
      accountType: ['',
        [ Validators.required]
      ],
      city : ['', [
        Validators.required
      ]],
      zipCode : ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      companyName: ['', [Validators.maxLength(50)]],
      matFiscal: [],
      registerCommerce : []
        ,
      secondPhoneNumber : ['', [
          Validators.maxLength(15),
          Validators.minLength(8)
        ]],
      fax: ['', [Validators.maxLength(15)]],
      link: [],

      CGU: ['', [Validators.required]]
    },
      {validator: MustMatch('plainPassword', 'confirmPassword')}
    );
    this.form.get('accountType').setValue(this.selectedType);
    this.form.get('accountType').valueChanges.subscribe( value => {
      if (value === 'particular') {
        this.selected = true;
      } else {
        this.selected = false;
      }
    });
    this.form.get('link').disable();
    this.form.get('secondPhoneNumber').disable();
    this.form.get('fax').disable();
    this.form.get('companyName').disable();
    this.form.get('matFiscal').disable();
    this.form.get('registerCommerce').disable();


  }
  get email() {
    return this.form.get('email');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get firstName() {
    return this.form.get('firstName');
  }
  get plainPassword() {
    return this.form.get('plainPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get city() {
    return this.form.get('city');
  }
  get zipCode() {
    return this.form.get('zipCode');
  }
  get companyName() {
    return this.form.get('companyName');
  }
  get address() {
    return this.form.get('address');
  }
  get cgu() {
    return this.form.get('CGU');
  }
  get link() {
    return this.form.get('link');
  }
  get secondPhoneNumber() {
    return this.form.get('secondPhoneNumber');
  }
  get fax () {
    return this.form.get('fax');
  }
  get matFiscal() {
    return this.form.get('matFiscal');
  }
  get registerCommercial(){
    return this.form.get('registerCommercial');
  }
  confirmError() {
        if (this.confirmPassword.hasError('required')) {
            return 'Entrez une mot de passe';
        } else if (this.confirmPassword.hasError('minLength')) {
            return 'Minimum 8 caractères';
        } else if (this.confirmPassword.hasError('mustMatch')) {
            return 'Mots de passe non identiques';
        }
    }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      return this.router.navigate(['/']);
    }
    this.cgu.valueChanges.subscribe(value => {
            // console.log(value)
            this.cguSubmitted = value;
           // console.log(this.cguSubmitted);
        }
    );
  }
  typeChange(e) {
    if (this.selected === false) {
      this.form.get('link').enable();
      this.form.get('secondPhoneNumber').enable();
      this.form.get('fax').enable();
      this.form.get('companyName').enable();
      this.form.get('matFiscal').enable();
      this.form.get('registerCommerce').enable();
    } else {
      this.form.get('link').disable();
      this.form.get('secondPhoneNumber').disable();
      this.form.get('fax').disable();
      this.form.get('companyName').disable();
      this.form.get('matFiscal').disable();
      this.form.get('registerCommerce').disable();
    }

  }
  onSubmit() {
    this.isSubmitting = true;
    this.authService.registration(this.form.value).subscribe(
      response => {
        this.isSubmitting = false;
        return  this.router.navigate(['/email-sent', { isRegistred: true}]) ;
      },
      (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        if(error.status === 400) {
          if (error.error.errors.email ) {
            this.errorMsg = 'Adresse e-mail déjà utilisée';
            window.scroll(0, 0);
          } else {
            window.scroll(0, 0);
            this.errorMsg = 'Une erreur est survenue, essayez plutard';
          }
        }


        // console.log(obj);
        // let result = Object.keys(obj).map(function(key) {
        //     console.log(obj[key]);
        //     return [key, obj[key]];
        // });
        // console.log(result);
      }
    );
  }

}
