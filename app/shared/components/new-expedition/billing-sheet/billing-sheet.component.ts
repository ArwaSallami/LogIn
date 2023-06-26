import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Expedition} from '../../../Models/expedition';
// import * as JsPDF from 'jspdf';
import {StepFourComponent} from '../step-four/step-four.component';
import {Package} from '../../../Models/package';
import {Price} from '../../../Models/price';
import {Addresse} from '../../../Models/addresse';
@Component({
  selector: 'app-billing-sheet',
  templateUrl: './billing-sheet.component.html',
  styleUrls: ['./billing-sheet.component.scss']
})
export class BillingSheetComponent implements OnInit, OnChanges {
    @Input() expedition = new Expedition();
    @Input() price = new Price();
    depAdress = new Addresse();
    desAdress = new Addresse();
    billAdress = new Addresse();
    billing = false;
    packages: Package[] = [];
    @ViewChild('pdfContent') pdfContent: ElementRef;
  constructor() { }
  // downloadPDF() {
  //   const doc = new JsPDF();
  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //         return true;
  //     }
  //   };
  //   const content = this.pdfContent.nativeElement;
  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     'width': 190,
  //     'elementHandlers': specialElementHandlers
  //     });
  //   doc.save('Facture-' + this.expedition.publicCode + '.pdf');
  // }
  ngOnInit() {
  }
  ngOnChanges() {

    if (this.expedition.addresses.length > 0) {
      this.expedition.addresses.map(add => {
        if (add.type === 'DEPARTURE') {
          this.depAdress = add; }
        if (add.type === 'DESTINATION') {
          this.desAdress = add; }
        if (add.type === 'BILLING') {
          this.billAdress = add;
          this.billing = true;
        }

      });
    }
    if (this.expedition.packages.length > 0) {
      this.packages = this.expedition.packages;
    }
  }
  calcDec(val) {
    return Number.parseFloat(val).toPrecision(4);
  }

}
