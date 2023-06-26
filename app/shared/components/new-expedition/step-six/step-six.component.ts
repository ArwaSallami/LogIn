import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Expedition} from '../../../Models/expedition';
import {QRCodeComponent} from 'angularx-qrcode';
import { DomSanitizer } from '@angular/platform-browser';
import {BillingSheetComponent} from '../billing-sheet/billing-sheet.component';
import {Price} from '../../../Models/price';
import {CommandService} from '../../../ApiServices/command.service';
import {HttpResponse} from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.scss']
})
export class StepSixComponent implements OnInit, OnChanges {
    isOpen = 'is-closed';
    toggled(event) {
        if (event) {
            this.isOpen = 'is-open';
        } else {
            this.isOpen = 'is-closed';
        }
    }
    @Input() expedition = new Expedition();
    @Input() price = new Price();
    @ViewChild(QRCodeComponent)
    qrCode: QRCodeComponent;
    @ViewChild(BillingSheetComponent)
    billing: BillingSheetComponent;
    public myAngularxQrCode:string = null;
  constructor(private commandeService: CommandService, private router: Router) {
      // console.log(this.router.url);
  }
  ngOnInit() {}
  ngOnChanges() {
        // QrCode settings
        this.qrCode.colorlight = '#fff';
        this.qrCode.colordark = '#1f232b';
        this.qrCode.level = 'Q';
        this.qrCode.size = 256;
      if (this.expedition.publicCode !== undefined) {
          this.myAngularxQrCode = this.expedition.publicCode;
      } else {
          this.myAngularxQrCode = 'empty';
      }
  }
  downloadQrCode() {
      const data = this.qrCode.el.nativeElement.childNodes[1].currentSrc;
      let a = document.createElement('a');
      a.href = data;
      a.download = 'qrCode.jpg';
      document.body.appendChild(a);
      a.click();
      // console.log(a);
  }
  generateBill() {
    //const publicCode = localStorage.getItem('publicCode');
    const publicCode = this.expedition.publicCode;
    this.commandeService.generateBordereauPdf(publicCode).subscribe(response => {
      this.downloadFile(response);
    }, erro => {
      console.log(erro);
    });
    // this.commandeService.generateBillingPdf(publicCode).subscribe(response => {
    //   this.downloadFile(response);
    //
    // },
    //   error => {
    //   console.log(error);
    //   });

  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'Facture' + this.expedition.publicCode + '.pdf';
      document.body.appendChild(a);
      a.click();
  }
    // reload page
    ReloadPage(evt) {
      evt.view.location.reload();
    }
}
