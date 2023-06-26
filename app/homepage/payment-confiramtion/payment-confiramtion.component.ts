import {Component, OnInit, ViewChild} from '@angular/core';
import {CommandService} from '../../shared/ApiServices/command.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {Expedition} from '../../shared/Models/expedition';
import {Price} from '../../shared/Models/price';
import {MovingDirection, WizardComponent} from 'angular-archwizard';

@Component({
  selector: 'app-payment-confiramtion',
  templateUrl: './payment-confiramtion.component.html',
  styleUrls: ['./payment-confiramtion.component.scss']
})
export class PaymentConfiramtionComponent implements OnInit {

  steptitle5 = 'Règlement';
  steptitle6 = 'Finalisation';
  current_index;
  current_step_title;
  expedition: Expedition;
  price: Price;
  message;
  successPayment = undefined;
  @ViewChild(WizardComponent)
  private wizard: WizardComponent;
  constructor(private commandeService: CommandService,
              private spinnerService: Ng4LoadingSpinnerService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  getstepTitle (direction: MovingDirection): void {
    /*this.current_step_title = this.wizard.model.currentStep.stepTitle;
    this.current_index = this.wizard.model.currentStepIndex + 1;
    this.wizard.disableNavigationBar = true;*/
  }


  ngOnInit() {
    let publicCode = this.route.snapshot.paramMap.get('publicCode').substr(0, 11);
    console.log(publicCode);
    this.spinnerService.show();
    this.commandeService.checkPayment(publicCode).subscribe(response => {
      console.log(response);
      if (response['payload'].OrderStatus === 2 && response['payload'].ErrorCode === 0)
      {
        this.message = "Succès de paiement";
        this.successPayment = true;
        if (response['payload'].approvalCode !== undefined)
        {
          this.commandeService.expeditionConfirme(publicCode).subscribe( response => {
             console.log(response);
          }, error => {
            // console.log(error);
          });
        }
      }
      else {
        this.message = "Erreur de paiement";
      }
    },error => {
      console.log(error);
      //this.router.navigate(['/suivicolis']);
    });
    this.commandeService.getPrices(publicCode).subscribe(price => {
      this.price = price;
      this.commandeService.getExpedition(publicCode).subscribe(expdition => {
        this.expedition = expdition;
      },error => {
        this.router.navigate(['/suivicolis']);
        this.spinnerService.hide();
      });
    },error => {
      this.router.navigate(['/suivicolis']);
    });

  }

}
