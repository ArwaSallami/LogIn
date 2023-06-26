import {Component, Directive, EmbeddedViewRef, Host, Input, NgIterable, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {DashboardService} from '../../shared/ApiServices/dashboard.service';
import {Expedition} from '../../shared/Models/expedition';
import {FormControl, FormGroup} from '@angular/forms';
import {Price} from '../../shared/Models/price';
import {CommandService} from '../../shared/ApiServices/command.service';
import {NgForOf} from '@angular/common';
import {FilterPipe} from 'ngx-filter-pipe';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-package-history',
  templateUrl: './package-history.component.html',
  styleUrls: ['./package-history.component.scss']
})
export class PackageHistoryComponent implements OnInit {
  pager;
  expeditions: Expedition[] = [];
  exped = new Expedition();
  expeditionFilter: any = { publicCode : '' };
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

  constructor(private dashboardService: DashboardService,
              private commandService: CommandService,
              private filterPipe: FilterPipe,
              private spinnerService: Ng4LoadingSpinnerService) {
              this.spinnerService.show();
      this.dashboardService.getFinishedExpeditions().subscribe(expeditions => {
          this.expeditions = expeditions;
          this.spinnerService.hide();
      }, error => {
          console.log(error);
          this.spinnerService.hide();
      });

  }


  ngOnInit() {

  }
  changeListNumber() {
    let p = this.listnbr.value;
    this.nbrPerPage = +p;
    return p;
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
  viewBilling(expedition: Expedition) {

    this.commandService.getPrices(expedition.publicCode).subscribe(price => {
      this.price = price;
    });
    this.exped = expedition;
  }

}
@Directive({
  selector: '[ngForIfEmpty]',
})
export class NgForIfEmpty<T> {
  @Input()
  public set ngForIfEmpty(templateRef: TemplateRef<any>) {
    this.templateRef = templateRef;
    this.viewRef = null;
    this.updateView();
  }
  private templateRef: TemplateRef<any>;
  private viewRef: EmbeddedViewRef<any>;
  private _isEmpty = false;

  constructor(@Host() private ngForOf: NgForOf<T>, private viewContainer: ViewContainerRef) {
    const _ngDoCheck = ngForOf.ngDoCheck.bind(ngForOf);
    ngForOf.ngDoCheck = () => {
      _ngDoCheck();

      this.isEmpty = !ngForOf.ngForOf || this.isIterableEmpty(ngForOf.ngForOf);
    } ;

  }
  private set isEmpty(value: boolean) {
    if (value !== this._isEmpty) {
      this._isEmpty = value;
      this.updateView();
    }
  }
  private get isEmpty() {
    return this._isEmpty;
  }

  private updateView() {
    if (this.isEmpty) {
      if (!this.viewRef) {
        this.viewContainer.clear();
        if (this.templateRef) {
          this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    } else {
      //this.viewContainer.clear();
      this.viewRef = null;
    }
  }

  private isIterableEmpty(iterable: NgIterable <T>): boolean {
    for (let item of iterable) {
      return false;
    }

    return true;
  }


}

