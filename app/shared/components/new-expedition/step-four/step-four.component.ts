import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Expedition} from '../../../Models/expedition';
import {Price} from '../../../Models/price';
import {Addresse} from '../../../Models/addresse';
import {Package} from '../../../Models/package';
import {CommandService} from '../../../ApiServices/command.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {DiscountCodes} from '../../../Models/discountCodes';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss']
})
export class StepFourComponent implements OnInit, OnChanges {
    @Input() expedition = new Expedition();
    @Input() price = new Price();
    depAdress = new Addresse();
    desAdress = new Addresse();
    packages: Package[] = [];
    originalPrice = 0;
  constructor(private commandService: CommandService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }
  ngOnChanges() {
      if (this.expedition.addresses.length > 0) {
        this.expedition.addresses.map(add => {
          if (add.type === 'DEPARTURE') {
            this.depAdress = add; }
          if (add.type === 'DESTINATION') {
            this.desAdress = add; }
        });
      }
      if (this.expedition.packages.length > 0) {
        this.packages = this.expedition.packages;
        console.log(this.packages);
      }
      if(this.expedition.discountCodes !== undefined) {
        if (this.expedition.discountCodes !== null) {
          this.originalPrice = this.expedition.originalPrice(this.expedition.totalIncVat);

        }
      }
  }
  onBack() {
      this.spinnerService.show();
      window.scroll(0, 300);
    const publicCode = localStorage.getItem('publicCode');
    this.commandService.delteExpeditionAdress(publicCode).subscribe( response => {
      // console.log(response);
      this.spinnerService.hide();
    },
      error => {
      // console.log(error);
      this.spinnerService.hide();
      }
      );
  }
    // Calc Decimal two digits package
    calcDec(val) {
        return Number.parseFloat(val).toPrecision(4);
    }
    goTop() {
      window.scroll(0, 300);
  }
}
