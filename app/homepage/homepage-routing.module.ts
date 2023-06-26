import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent} from '../layout/main-layout/main-layout.component';
import {HomepageComponent} from './homepage.component';
import {SupportComponent} from './support/support.component';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';
import {NewCommandComponent} from './new-command/new-command.component';
import {PlateformLayoutComponent} from '../layout/plateform-layout/plateform-layout.component';
import {OffersComponent} from './offers/offers.component';
import {OfferListComponent} from './offers/offer-list/offer-list.component';
import {OfferModule} from './offers/offer.module';
import {SuivcolisComponent} from './suivcolis/suivcolis.component';
import {FaqComponent} from './faq/faq.component';
import {PaymentConfiramtionComponent} from './payment-confiramtion/payment-confiramtion.component';

const landing: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'homepage', component: HomepageComponent },
            { path: 'support', component: SupportComponent },
            { path: 'commande', component: NewCommandComponent},
            { path: 'suivicolis', component: SuivcolisComponent},
            { path: 'faq', component: FaqComponent},
            { path: 'suivicolis/:publicCode', component: SuivcolisComponent},
            { path: 'payment_success/:publicCode', component: PaymentConfiramtionComponent}

        ]
    },
    {
        path: '',
        redirectTo: '/homepage',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(landing),
    OfferModule],
    exports: [RouterModule]
})
export class HomepageRoutingModule { }
