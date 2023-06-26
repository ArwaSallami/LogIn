import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrls: ['./member-layout.component.scss']
})
export class MemberLayoutComponent implements OnInit {
    isRegister = false;
    constructor(private router: Router) {}
    ngOnInit() {
        (this.router.url === '/register') ? this.isRegister = true : this.isRegister;
    }

}
