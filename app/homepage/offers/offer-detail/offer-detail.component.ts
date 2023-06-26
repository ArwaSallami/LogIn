import { Component, OnInit } from '@angular/core';
import {IOffer} from '../offer';
import { ActivatedRoute, Router } from '@angular/router';
import {OfferService} from '../offer.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
    pageTitle = 'Product Detail';
    errorMessage = '';
    offer: IOffer | undefined;
    exp_id;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private offerService: OfferService) {
    }

    ngOnInit() {
        // const param = this.route.snapshot.paramMap.get('id');
        // if (param) {
        //     const id = +param;
        //     this.getProduct(id);
        // }
      this.route.paramMap.subscribe(parmMap => {
        const param = parmMap['params'].id;
        if (param) {
          const id = + param;
          this.getProduct(id);
          this.exp_id = id;
        }
      });
    }
    getProduct(id: number) {
        this.offerService.getProduct(id).subscribe(
            offer => this.offer = offer,
            error => this.errorMessage = <any>error);
    }

}
