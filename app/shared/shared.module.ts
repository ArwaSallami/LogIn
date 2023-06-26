import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import {ChatService} from './ApiServices/chat.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faChevronDown, faChevronUp, faPaperPlane, faQrcode} from '@fortawesome/free-solid-svg-icons';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import {library} from '@fortawesome/fontawesome-svg-core';
import {AppRoutingModule} from '../app-routing.module';
import {QRCodeModule} from 'angularx-qrcode';
import { NewExpeditionComponent } from './components/new-expedition/new-expedition.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {ArchwizardModule} from 'angular-archwizard';
import {StepTwoComponent} from './components/new-expedition/step-two/step-two.component';
import {StepFourComponent} from './components/new-expedition/step-four/step-four.component';
import {BillingSheetComponent} from './components/new-expedition/billing-sheet/billing-sheet.component';
import {StepFiveComponent} from './components/new-expedition/step-five/step-five.component';
import {StepSixComponent} from './components/new-expedition/step-six/step-six.component';
import {StepThreeComponent} from './components/new-expedition/step-three/step-three.component';
import {StepOneComponent} from './components/new-expedition/step-one/step-one.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import {faFilePdf} from '@fortawesome/free-regular-svg-icons/faFilePdf';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {ContactComponent} from './contact/contact.component';
import {ContactService} from './ApiServices/contact.service';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MapsComponent } from './components/maps/maps.component';
import {AgmCoreModule} from "@agm/core";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {FilterPipeModule} from "ngx-filter-pipe";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer'
import {SuiviMapComponent} from './components/suivi-map/suivi-map.component';
import { SuiviExpComponent } from './components/suivi-exp/suivi-exp.component';

@NgModule({
  declarations: [
    ContactComponent,
    NotFoundComponent,
    ChatBotComponent,
    NewExpeditionComponent,
    BillingSheetComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    SuiviMapComponent,
    MapsComponent,
    SuiviExpComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgbModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ArchwizardModule,
    QRCodeModule,
    NgxCaptchaModule,
    AgmCoreModule.forRoot({
      apiKey: ""
    }),
    NgMultiSelectDropDownModule,
    FilterPipeModule,
    AgmJsMarkerClustererModule


  ],
    providers: [ContactService, ChatService],
  exports: [ContactComponent,
    ChatBotComponent,
    NotFoundComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    BillingSheetComponent,
    SuiviMapComponent,
    QRCodeModule, NewExpeditionComponent, SuiviExpComponent,
  ]


})
export class SharedModule {
  constructor() {
      library.add(faPaperPlane, faCommentAlt, faTrashAlt, faChevronUp, faChevronDown, faQrcode, faFilePdf, faDownload, faSignOutAlt);
  }
}
