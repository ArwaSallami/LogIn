import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MembershipRoutingModule} from './membership-routing.module';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../shared/ApiServices/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner';

@NgModule({
  declarations: [
      LoginComponent,
      RegisterComponent,
      ConfirmationComponent,
      PasswordResetComponent,
      ProfileComponent,
      EmailSentComponent
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule

  ],
  providers: [AuthService]
})
export class MembershipModule {
    constructor() {
        library.add(faSpinner);
    }
}
