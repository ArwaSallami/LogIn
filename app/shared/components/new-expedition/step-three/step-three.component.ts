import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommandService} from '../../../ApiServices/command.service';
import {MustMatch} from '../../../helpers/field-matcher.validator';
import {Expedition} from '../../../Models/expedition';
import {WizardComponent} from 'angular-archwizard';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {AuthService} from '../../../ApiServices/auth.service';
import {User} from '../../../Models/user';
import {Observable} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {States} from "../../../ApiServices/states";
import {StatesService} from "../../../ApiServices/states.service";

@Component({
    selector: 'app-step-three',
    templateUrl: './step-three.component.html',
    styleUrls: ['./step-three.component.scss']
})

export class StepThreeComponent implements OnInit, OnChanges {
  httpError = {'code': '', 'message': ''};
    @Input() expedition = new Expedition();
    user = new User();
    states: States[];
    dep_model = { 'name': '', 'zipCode': ''};
    dest_model = { 'name': '', 'zipCode': ''};
    submitted3 = false;
    isLogIn = false;
    addFact = false;
    httpError3 = {'code': '', 'message': ''};
    form = new FormGroup({
        expediteur: new FormGroup({
            firstName: new FormControl('', [
                Validators.required
            ]),
            lastName: new FormControl('', [
                Validators.required
            ]),
            phoneNumber: new FormControl('', [
                Validators.required
            ]),
            address: new FormControl('', [
                Validators.required
            ]),
            complementOfAddress: new FormControl('', [
                Validators.required
            ]),
            zipCode: new FormControl({value: '', disabled: true}, [
                Validators.required
            ]),
            municipality: new FormControl({value: '', disabled: true}, [
                Validators.required
            ]),
            type: new FormControl('DEPARTURE'),
            companyName: new FormControl(''),
            vatNumber: new FormControl('')

        }),
        destinateur: new FormGroup({
            firstName: new FormControl('', [
                Validators.required
            ]),
            lastName: new FormControl('', [
                Validators.required
            ]),
            email: new FormControl('', [
                Validators.minLength(10),
                Validators.required,
                Validators.email
            ]),
            phoneNumber: new FormControl('', [
                Validators.required
            ]),
            address: new FormControl('', [
                Validators.required
            ]),
            complementOfAddress: new FormControl('', [
                Validators.required
            ]),
            zipCode: new FormControl({value: '', disabled: true}, [
                Validators.required
            ]),
            municipality: new FormControl({value: '', disabled: true}, [
                Validators.required
            ]),
            type: new FormControl('DESTINATION'),
            companyName: new FormControl(''),
            vatNumber: new FormControl('')

        }),
        factAddressCheckBox: new FormControl(false),
        factAddress: this.fb.group( {
          address: new FormControl('', [
            Validators.required
          ]),
          complementOfAddress: new FormControl('', [
            Validators.required
          ]),
          zipCode: new FormControl('', [
            Validators.required
          ]),
          municipality: new FormControl( '' ,[
             Validators.required
          ]),
          type: new FormControl('BILLING')
        }),
        emails: this.fb.group({
            email: new FormControl({value: '', disabled: false} , [
                Validators.minLength(10),
                Validators.required,
                Validators.email
            ]),
            confirmEmail: new FormControl({value: '', disabled: false}, [
                Validators.minLength(10),
                Validators.required,
                Validators.email
            ]),
            emailCGU: new FormControl('')
        },
            {validator: MustMatch('email', 'confirmEmail')}
        ),

        code: new FormGroup({
            publicCode: new FormControl('')
        })
    }
    );
    // emails g
    // etters
    get userEmail() {
        return this.form.get('emails').get('email');
    }
    get confirmUserEmail() {
        return this.form.get('emails').get('confirmEmail');
    }
    get emailCGU() {
        return this.form.get('emails').get('emailCGU');
    }
    // expediteurs getters
    get ExpfirstName() {
        return this.form.get('expediteur').get('firstName');
    }
    get ExplastName() {
        return this.form.get('expediteur').get('lastName');
    }
    get ExpphoneNumber() {
        return this.form.get('expediteur').get('phoneNumber');
    }
    get ExpAddress() {
        return this.form.get('expediteur').get('address');
    }
    get ExpcomplementOfAddress() {
        return this.form.get('expediteur').get('complementOfAddress');
    }
    get ExpzipCode() {
        return this.form.get('expediteur').get('zipCode');
    }

    get ExpMunicipality() {
        return this.form.get('expediteur').get('municipality');
    }
    get ExpvatNumber() {
        return this.form.get('expediteur').get('vatNumber');
    }
    // destinataires getters
    get DestfirstName() {
        return this.form.get('destinateur').get('firstName');
    }
    get DestlastName() {
        return this.form.get('destinateur').get('lastName');
    }
    get DestEmail() {
        return this.form.get('destinateur').get('email');
    }
    get DestphoneNumber() {
        return this.form.get('destinateur').get('phoneNumber');
    }
    get DestAddress() {
        return this.form.get('destinateur').get('address');
    }
    get DestcomplementOfAddress() {
        return this.form.get('destinateur').get('complementOfAddress');
    }
    get DestzipCode() {
        return this.form.get('destinateur').get('zipCode');
    }
    get DestMunicipality() {
        return this.form.get('destinateur').get('municipality');
    }
    get vatNumber() {
      return this.form.get('expediteur').get('vatNumber');
    }
    get companyName() {
      return this.form.get('expediteur').get('companyName');
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.form.controls;
    }

    emailError() {
        if (this.userEmail.hasError('required')) {
                return 'Ce champs est obligatoire';
        } else if (this.userEmail.hasError('email')) {
            return 'Entrez une adresse e-mail valide';
        } else if (this.userEmail.hasError('minLength')) {
            return 'Minimum 10 caractères';
        }
    }
    confirmError() {
        if (this.confirmUserEmail.hasError('required')) {
            return 'Ce champs est obligatoire';
        } else if (this.confirmUserEmail.hasError('email')) {
            return 'Entrez une adresse e-mail valide';
        } else if (this.confirmUserEmail.hasError('minLength')) {
            return 'Minimum 10 caractères';
        } else if (this.confirmUserEmail.hasError('mustMatch')) {
            return 'Adresses mails ne sont pas identiques';
        }
    }
    destemailError() {
        if (this.DestEmail.hasError('required')) {
            return 'Ce champs est obligatoire';
        } else if (this.DestEmail.hasError('email')) {
            return 'Entrez une adresse e-mail valide';
        } else if (this.DestEmail.hasError('minLength')) {
            return 'Minimum 10 caractères';
        }
    }
    get publicCode(): any {
        return this.form.get('code.publicCode');
    }
    expeditionCode() {
        this.form.get('code.publicCode').setValue(localStorage.getItem('publicCode'));
    }
    constructor(private commandService: CommandService, private statesService: StatesService,
                private fb: FormBuilder,
                private wizard: WizardComponent,
                private spinnerService: Ng4LoadingSpinnerService,
                private authService: AuthService) {
      this.form.get('factAddressCheckBox').valueChanges.subscribe(value => {
          this.addFact = value;
      });
    }
   /* bloc for search municipalty and zipcode*/

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term.length < 1 ? []
        : this.states.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter =( x: {name: string}) =>
    x.name;


  search2 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term.length < 1 ? []
        : this.states.filter(v => v.zipCode.toString().toLowerCase().indexOf(term.toString().toLowerCase()) > -1).slice(0, 10))
    )
  depGov() {
    this.httpError = {'code': '', 'message': ''};
    if (this.ExpMunicipality.value !== undefined) {
      this.dep_model = this.ExpMunicipality.value;
      this.ExpzipCode.patchValue(this.dep_model.zipCode);
      this.ExpMunicipality.patchValue(this.dep_model.name);
      if ((this.dep_model.name === undefined) && (this.dep_model.zipCode === undefined)) {
        // console.log('is undefined');
        this.dep_model = {'name': '', 'zipCode': ''};
      }
    }
  }
  recGov() {
    if (this.DestMunicipality.value !== undefined) {
      this.dest_model = this.DestMunicipality.value;
      this.DestzipCode.patchValue(this.dest_model.zipCode);
      this.DestMunicipality.patchValue(this.dest_model.name);
      if ((this.dest_model.name === undefined) && (this.dest_model.zipCode === undefined)) {
        // console.log('is undefined');
        this.dest_model = {'name': '', 'zipCode': ''};
      }
    }

  }
  get depZipCode() {
    return this.form.get('depZipCode');
  }
  get depCity() {
    return this.form.get('ExpMunicipality');
  }
    ngOnInit() {
      this.statesService.getStates().subscribe( states => {
        this.states = states['payload'];
      });
      if ( this.isLogIn = this.authService.isLoggedIn() ) {
        this.authService.getCurrentUser().subscribe( user => {
          this.user = user;
          this.userEmail.setValue(user.email);
          this.userEmail.disable();
          this.confirmUserEmail.setValue(user.email);
          this.confirmUserEmail.disable();
          // if ((this.expedition.senderType === 'professional') && (user.accountType === 'pro')) {
          //   this.vatNumber.setValue(user.vatNumber);
          //   this.companyName.setValue(user.companyName);
          //   this.companyName.disable();
          //   this.vatNumber.disable();
          // }
        });
      }
      // console.log('what is login');
      // console.log(this.isLogIn);
    }
    ngOnChanges() {
        // console.log(this.expedition);
        if (this.expedition.depZipCode !== undefined) {
            this.ExpzipCode.setValue(this.expedition.depZipCode);
        }

        if (this.expedition.depCity !== undefined ) {
            this.ExpMunicipality.setValue(this.expedition.depCity);
        }

        if (this.expedition.deliveryMethod === 'drop' ) {
          this.DestMunicipality.setValue(this.dest_model.name);


        }
        if (this.expedition.deliveryMethod === 'collect'){
          this.dest_model.name = this.expedition.desCity;
          this.DestMunicipality.setValue(this.expedition.desCity);

        }

        if (this.expedition.desZipCode !== undefined) {
            this.DestzipCode.setValue(this.expedition.desZipCode);

        }
        if (this.expedition.desCity !== undefined) {
            this.DestMunicipality.setValue(this.expedition.desCity);
        }
        if ((this.expedition.senderType === 'professional') && ( this.user.accountType === 'pro')) {
          if (this.user.vatNumber  && this.user.companyName ) {
            this.vatNumber.setValue(this.user.vatNumber);
            this.companyName.setValue(this.user.companyName);
            this.companyName.disable();
            this.vatNumber.disable();
          }
        }
        /*functoions to set adress departure and receive depent to methode */
      if(this.expedition.pickUpMethod === 'drop') {
        console.log('drop');
        console.log(this.dep_model);

        this.ExpzipCode.disable();
        this.ExpzipCode.reset();
        this.ExpzipCode.clearValidators();
        this.ExpMunicipality.enable();
        this.ExpMunicipality.reset();
      }
      if(this.expedition.pickUpMethod === 'collect') {
        this.dep_model.name= this.expedition.depCity;
        this.ExpMunicipality.setValue(this.expedition.depCity);
      }
      if(this.expedition.deliveryMethod === 'drop') {
        this.DestzipCode.disable();
        this.DestzipCode.reset();
        this.DestzipCode.clearValidators();
        this.DestMunicipality.enable();
        this.DestMunicipality.reset();
      }
    }
    onSubmit3() {
      if ((this.form.get('expediteur').valid) &&
        (this.form.get('destinateur').valid) &&
        (this.form.get('emails').valid)
      ) {
        if( !this.form.get('factAddressCheckBox').value || this.form.get('factAddress').valid) {
          if (this.expedition.deliveryMethod=== 'drop') {
            this.DestzipCode.enable();
          }
          if (this.expedition.pickUpMethod === 'drop' ) {
            this.ExpzipCode.enable();

          }
      // console.log(this.confirmUserEmail);
            this.submitted3 = true;
            // console.log('loading...');
            this.spinnerService.show();
            this.expeditionCode();
            window.scroll(0, 300);
        this.commandService.addAddresses(this.form.value).subscribe( response => {
            this.DestzipCode.disable();
            this.ExpzipCode.disable();
                  // console.log(response);
                this.wizard.navigation.goToNextStep();
              },
              error => {
                this.DestzipCode.disable();
                this.ExpzipCode.disable();
                  // console.log(error);
                  this.httpError3 = error.error;
                  this.spinnerService.hide();
                  // console.log(error.error);
                  window.scroll(0, 0);
                  this.submitted3 = false;

              },
            () => {
                this.spinnerService.hide();
                // console.log('Done');
                this.submitted3 = false;
            });
            } } else {
             this.submitted3 = false;
             this.form.setErrors({
                            invalidForm: true
                        });
             window.scroll(0, 300);
                }
    }
    goTop() {
        window.scroll(0, 300);
    }
}
