import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../shared/ApiServices/auth.service';
import {DashboardService} from '../../shared/ApiServices/dashboard.service';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../shared/Models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user = new User();
  form;
  errorMsg;
  isSubmitting = false;
  isUpdating = false;
  isUpdatePro = false;
  passwordForm;
  proForm;
  accountMsg;
  passwordMsg;
  passwordError;
  updateProMsg;
  updateProMsgError;
  private imageSrc = '';
    constructor(private authService: AuthService, private dashboardService: DashboardService, fb: FormBuilder) {
      this.form = fb.group({
        firstName: ['', [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(5)
        ]],
        lastName :['',[
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(3),
        ]],
        address: ['', [
          Validators.required
        ]],
        phoneNumber : ['',[
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(8)
        ]],
        city : ['',[
          Validators.required
        ]],
        zipCode :['',[
          Validators.required,
          Validators.minLength(4)
        ]]
      });
      this.passwordForm = fb.group( {
        oldPassword: ['', [
          Validators.required,
          Validators.minLength(8)
        ]],
        newPassword: ['', [
          Validators.required,
          Validators.minLength(8)
        ]]
      });
      this.proForm = fb.group({
        companyName: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]],
        vatNumber: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15)
        ]],
        imgPat: ['']

      });


  }
  get companyName() {
      return this.proForm.get('companyName');
  }
  get vatNumber() {
      return this.proForm.get('vatNumber');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get firstName() {
    return this.form.get('firstName');
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
  get address(){
    return this.form.get('address');
  }
  get oldPassword() {
      return this.passwordForm.get('oldPassword');
  }
  get newPassword() {
      return this.passwordForm.get('newPassword');
  }


  ngOnInit() {
      this.authService.getCurrentUser().subscribe((user: User) => {
        this.user = user;
        this.firstName.setValue(this.user.firstName);
        this.lastName.setValue(this.user.lastName);
        this.phoneNumber.setValue(this.user.phoneNumber);
        this.zipCode.setValue(this.user.zipCode);
        this.address.setValue(this.user.address);
        this.city.setValue(this.user.city);
        this.vatNumber.setValue(this.user.vatNumber);
        this.companyName.setValue(this.user.companyName)
      }, error => {
        console.log(error);
      });

  }
  onUpdate() {
      this.isSubmitting = true;
      this.dashboardService.updateUser(this.form.value).subscribe( response => {
        if (response) {
          // console.log('success');
            this.accountMsg = 'Mise à jour réussie';
        }
      }, error => {
        // console.log(error);
          this.errorMsg = 'Une erreur technique est survenue, essayez plutard';
        }, () => { this.isSubmitting = false;});

  }
  onChangePasswoed() {
      this.isUpdating = true;
      this.dashboardService.updatePassword(this.passwordForm.value).subscribe( response => {
        // console.log(response);
        if (response) {
          this.passwordError = null;
          this.passwordMsg = 'Mise à jour réussie';
        }
      }, error => {
         console.log(error);
         this.passwordMsg = null;
        this.passwordError = 'Une erreur technique est survenue, essayez plutard';
        this.isUpdating = false;
      }, () => { this.isUpdating = false; });
  }
  onUpdatePro() {
      this.isUpdatePro = true;
      this.dashboardService.updateProData(this.proForm.value).subscribe( response => {
        if(response ) {
          this.updateProMsg =  'Mise à jour reussie ';
        }
      }, error => {
        this.updateProMsgError = 'Une erreur technique est survenue , essayez plus tard ';
        this.isUpdatePro = false;
      }, () => { this.isUpdatePro = false});
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
    this.proForm.get('imgPat').setValue(this.imageSrc);
  }


}
