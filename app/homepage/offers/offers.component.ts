import { Component, OnInit } from '@angular/core';
import {OfferService} from './offer.service';
import {IOffer} from './offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offers: IOffer[] = [];
    OffersContent = {
        title: 'Découvrez nos solutions informatiques',
        description: '',
    }
        constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.getProducts().subscribe(offers => {
      this.offers = offers;
    });

  }

}
