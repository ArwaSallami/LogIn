import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/ApiServices/auth.service';
import {User} from '../../shared/Models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email: string;
  user = new User();
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.getUser();
  }
  public getUser() {
    this.authService.getCurrentUser().subscribe( user => {
      this.user = user;
    });



  }


}
