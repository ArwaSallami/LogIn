import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MemberLayoutComponent} from '../layout/member-layout/member-layout.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuardService} from '../shared/ApiServices/auth-guard.service';
import {EmailSentComponent} from './email-sent/email-sent.component';

const routes: Routes = [
    {
        path: 'login',
        component: MemberLayoutComponent,
        children: [
            { path: '', component: LoginComponent }
        ]
    }
    ,
    {
        path: 'register',
        component: MemberLayoutComponent,
        children: [
            { path: '', component: RegisterComponent }
        ]
    }
    ,
    {
    path: 'register/confirmation/:token',
    component: MemberLayoutComponent,
    children: [
      {path: '', component: ConfirmationComponent }
    ]
    }
    ,
   {
     path: 'password/reset-request',
     component: MemberLayoutComponent,
     children: [
       {path: '', component: PasswordResetComponent }
     ]
   }
   ,
  {
    path: 'password/reset/:token',
    component: MemberLayoutComponent,
    children: [
      {path: '', component: PasswordResetComponent}
    ]
  },
    {
        path: 'email-sent',
        component: MemberLayoutComponent,
        children: [
            {path: '', component: EmailSentComponent}
        ]
    },
  {
    path: 'profile',
    component: MemberLayoutComponent,
    children: [
      {path: '', component: ProfileComponent, canActivate: [AuthGuardService]}
    ]
  },
    {
        path: '',
        redirectTo: '/homepage',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembershipRoutingModule { }
