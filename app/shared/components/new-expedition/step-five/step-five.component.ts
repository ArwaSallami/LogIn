import {Component, Input, OnInit} from '@angular/core';
import {Expedition} from '../../../Models/expedition';
import {CommandService} from '../../../ApiServices/command.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.scss']
})
export class StepFiveComponent implements OnInit {
    @Input() expedition = new Expedition();
  constructor(private commandeService: CommandService,
              private spinnerService: Ng4LoadingSpinnerService
  ) { }
  ngOnInit() {
  }
  onConfirme() {
      window.scroll(0, 300);
    const publicCode = localStorage.getItem('publicCode');
    this.commandeService.expeditionConfirme(publicCode).subscribe( response => {
      // console.log(response);
    }, error => {
      // console.log(error);
    });
  }
  onOnlinePayment() {
    const publicCode = localStorage.getItem('publicCode');
    this.spinnerService.show();
    this.commandeService.getPaymentInterface(this.expedition).subscribe(response => {
     window.location.href = response['payload'].formUrl;
    }, error => {
      this.spinnerService.hide();
      console.log(error);
    });
  }
    // Calc Decimal two digits package
    calcDec(val) {
        return Number.parseFloat(val).toPrecision(4);
    }
}
