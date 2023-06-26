import {Component, OnInit, ViewChild} from '@angular/core';
import {Price} from '../../Models/price';
import {CommandService} from '../../ApiServices/command.service';
import {Expedition} from '../../Models/expedition';
import {MovingDirection, WizardComponent} from 'angular-archwizard';
import {Relypoints} from "../../Models/relypoints";

@Component({
  selector: 'app-new-expedition',
  templateUrl: './new-expedition.component.html',
  styleUrls: ['./new-expedition.component.scss']
})
export class NewExpeditionComponent {


  steptitle1 = 'Description de votre expédition';
  steptitle2 = 'Détail et tarifs';
  steptitle3 = 'Coordonnées';
  steptitle4 = 'Confirmation';
  steptitle5 = 'Règlement';
  steptitle6 = 'Finalisation';
  current_index;
  current_step_title;
  price = new Price();
  expedition = new Expedition();
  priceS2 = new Price();
  expeditionS2 = new Expedition();
  @ViewChild(WizardComponent)
  private wizard: WizardComponent;
  constructor(private commandService: CommandService) {
  }
  // Getting step titles and its index
  getstepTitle (direction: MovingDirection): void {
    this.current_step_title = this.wizard.model.currentStep.stepTitle;
    this.current_index = this.wizard.model.currentStepIndex + 1;
    this.wizard.disableNavigationBar = true;
  }
  start() {
    // console.log(this.expedition.packages);
    const data = localStorage.getItem('publicCode');
    this.commandService.getPrices(data).subscribe(price => {
      this.expedition = new Expedition();
      this.price = price;

      this.commandService.getExpedition(data).subscribe(expedition => {

        this.expedition = expedition;
      });
    });


  }
  start2() {
    // console.log(this.expedition.packages);
    const data = localStorage.getItem('publicCode');
    this.commandService.getPrices(data).subscribe(price => {
      this.expeditionS2 = new Expedition();
      this.priceS2 = price;

      this.commandService.getExpedition(data).subscribe(expedition => {

        this.expeditionS2 = expedition;
        console.log(this.expeditionS2);
      });
    });


  }


}
