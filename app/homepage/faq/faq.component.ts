import { Component, OnInit } from '@angular/core';
import {Faq} from './faq';
import {FaqService} from './faq.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  private faq: Faq[] = [];
  constructor(private faqService: FaqService, private spinnerService: Ng4LoadingSpinnerService ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.faqService.getAllFaq().subscribe( data => {
      this.faq = data;
      this.spinnerService.hide();
      console.log(data);
    });
  }

}
