import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/ApiServices/auth.service';
import {User} from '../../../shared/Models/user';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
    user = new User();
    logo = 'assets/img/log-in-logo.svg';
    isLogin = false;
    defaultLanguage = 'fr';
    private isOpen = 'is-closed';
    private isOpen2 = 'is-closed';
    toggled(event) {
        if (event) {
            this.isOpen = 'is-open';
        } else {
            this.isOpen = 'is-closed';
        }
    }
    toggled2(event) {
        if (event) {
            this.isOpen2 = 'is-open';
        } else {
            this.isOpen2 = 'is-closed';
        }
    }
  constructor(private authService: AuthService,
              private translate: TranslateService) {
      translate.setDefaultLang('fr');
  }

    onLogout() {
      this.isLogin = false;
    this.authService.logout('/');
  }
    // Safari iPhone menu collapse fix
    hideNav() {
    const element = document.getElementById('topNavBar');
    element.classList.remove('show');
 }
    ngOnInit() {
      if (this.isLogin = this.authService.isLoggedIn()) {
        this.getUser();
      }
    }
    getUser() {
        this.authService.getCurrentUser().subscribe( user => {
            this.user = user;
        });
}
    switchLanguage(language: string) {
        this.translate.use(language);
        this.defaultLanguage = language;
    }
}
