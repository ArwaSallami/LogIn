import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {IOffer} from '../offer';
import {OfferService} from '../offer.service';
import {Router} from '@angular/router';
import {OfferDetailComponent} from '../offer-detail/offer-detail.component';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit, AfterViewInit {
    @ViewChild(OfferDetailComponent) OfferDetailRef;
    offer_id;
    constructor(private offerService: OfferService) {

    }
    offers: IOffer[] = [];
    ngOnInit(): void {
        this.offerService.getProducts().subscribe(
            offers => {
                this.offers = offers;
            }
        );
    }
    ngAfterViewInit() {
        this.offer_id = this.OfferDetailRef.exp_id;
    }
}
