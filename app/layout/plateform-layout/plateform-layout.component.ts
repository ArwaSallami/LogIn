import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/ApiServices/auth.service';
import {User} from '../../shared/Models/user';
import {DashboardService} from '../../shared/ApiServices/dashboard.service';

@Component({
  selector: 'app-plateform-layout',
  templateUrl: './plateform-layout.component.html',
  styleUrls: ['./plateform-layout.component.scss']
})
export class PlateformLayoutComponent implements OnInit {
    isOpen = '';
    user = new User();
    inProgressNbr = -1;
    finishedNbr = -1;
    child = false;
    child2 = false;
    child3 = false;
  date = new Date();
  copyright ="Tous droits réservés Ⓒ" +this.date.getFullYear()+"- Log’In";

    toggled(event) {
        if (event) {
            // console.log('is open');
            this.isOpen = 'nav-is-visible';
        } else {
            // console.log('is closed');
            this.isOpen = '';
        }
        // console.log(event);
    }
    toggledChild() {
        this.child = !this.child;
    }
    toggledChild2() {
        this.child2 = !this.child2;
    }
    toggleChild3() {
      this.child3 = !this.child3;
    }
  constructor(private authService: AuthService, private dashboardService: DashboardService) {
      this.authService.getCurrentUser().subscribe( (user: User) => {
          this.user = user;
      }, error => {
      });
  }

  ngOnInit() {
      this.dashboardService.getExpeditionNbrByStatus('inProgress').subscribe( response => {
        this.inProgressNbr = response;
      });
      this.dashboardService.getExpeditionNbrByStatus('finished').subscribe( response => {
        this.finishedNbr = response;
      });
  }
  logout() {
      this.authService.logout('/');
  }

}
