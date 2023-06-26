import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-header',
  templateUrl: './membership-header.component.html',
  styleUrls: ['./membership-header.component.scss']
})
export class MembershipHeaderComponent implements OnInit {
    logo = 'assets/img/log-in-logo.svg';
  constructor() { }

  ngOnInit() {
  }

}
