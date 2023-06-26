import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-footer',
  templateUrl: './membership-footer.component.html',
  styleUrls: ['./membership-footer.component.scss']
})
export class MembershipFooterComponent implements OnInit {

  date = new Date();
  copyright ="Tous droits réservés Ⓒ" +this.date.getFullYear()+"- Log’In";
  constructor() { }

  ngOnInit() {
  }

}
