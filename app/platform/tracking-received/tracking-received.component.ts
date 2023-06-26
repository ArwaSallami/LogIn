import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../shared/ApiServices/dashboard.service';
import {CommandService} from '../../shared/ApiServices/command.service';
import {Expedition} from '../../shared/Models/expedition';
import {Price} from '../../shared/Models/price';
import {FormControl, FormGroup} from '@angular/forms';
import {FilterPipe} from 'ngx-filter-pipe';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tracking-received',
  templateUrl: './tracking-received.component.html',
  styleUrls: ['./tracking-received.component.scss']
})
export class TrackingReceivedComponent implements OnInit {

  expeditions: Expedition[] = [];
  exped = new Expedition();
  expeditionFilter : any = { publicCode : ''};
  price = new Price();
  listForm = new FormGroup({
    list : new FormControl('5'),
    searchText: new FormControl('')
  });
  nbrPerPage = 5;
  key = 'publicCode';
  reverse = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  get listnbr() {
    return this.listForm.get('list');
  }

  constructor(private dashboardService: DashboardService, private commandService: CommandService,
              private filterPipe: FilterPipe, private spinnerService: Ng4LoadingSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.spinnerService.show();
    this.dashboardService.getInProgressReceivedExpeditions().subscribe( expeditions => {
      this.expeditions = expeditions;
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
  }
  changeListNumber() {
    let p = this.listnbr.value;
    this.nbrPerPage = +p;
  }
  generateBill() {

    this.commandService.generateBillingPdf(this.exped.publicCode).subscribe(response => {
        this.downloadFile(response);

      },
      error => {
        console.log(error);
      });

  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'Facture' + this.exped.publicCode + '.pdf';
    document.body.appendChild(a);
    a.click();
  }
  downloadSlip(data: any, pcode: any) {
    const blob = new Blob([data], { type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'Bordereau-' + pcode + '.pdf';
    document.body.appendChild(a);
    a.click();
  }
  viewBilling(expedition: Expedition) {

    this.commandService.getPrices(expedition.publicCode).subscribe(price => {
      this.price = price;
    });
    this.exped = expedition;
  }
  generateBordereau(data) {
    this.commandService.generateBordereauPdf(data).subscribe( response => {
        this.downloadSlip(response, data);
    }, error  => {
      console.log(error);
    });
  }
  goToSuiviColis(publicCode) {
    localStorage.setItem('qrCode', publicCode);
    return this.router.navigate(['/dashboard/suivicolis']);

  }


}
