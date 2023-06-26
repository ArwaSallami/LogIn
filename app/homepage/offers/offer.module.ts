import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {OfferListComponent} from './offer-list/offer-list.component';
import {OfferDetailComponent} from './offer-detail/offer-detail.component';
import {MainLayoutComponent} from '../../layout/main-layout/main-layout.component';
import {OffersComponent} from './offers.component';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthGuardService} from '../../shared/ApiServices/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: MainLayoutComponent,
                children: [
                    { path: 'offers', component: OffersComponent
                    },
                    {
                        path: 'offers/:id',
                        component: OfferListComponent
                    }
                ]
            }
        ]),
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [
        OfferListComponent,
        OfferDetailComponent,
    ]

})
export class OfferModule {
    constructor() {
        library.add(faAngleDown);
    }
}
