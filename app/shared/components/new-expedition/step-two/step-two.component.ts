import {Component, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  NgbDatepickerI18n,
  NgbDateStruct,
  NgbDateParserFormatter,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import {isNumber, toInteger, padNumber} from '../../../Models/ng-datepicker';
import {CommandService} from '../../../ApiServices/command.service';
import {Price, PriceType} from '../../../Models/price';
import {Expedition} from '../../../Models/expedition';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';
import {Package} from '../../../Models/package';
import {WizardComponent} from 'angular-archwizard';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {getValue} from '@angular/core/src/render3/styling/class_and_style_bindings';
import {PackagingCategorie} from '../../../Models/packagingCategorie';
import {DiscountCodes} from '../../../Models/discountCodes';
import {until} from "selenium-webdriver";
import elementIsSelected = until.elementIsSelected;
import {el} from "@angular/platform-browser/testing/src/browser_util";

const I18N_VALUES = {
  'fr': {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  }
  // other languages you would support
};
// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {day: toInteger(dateParts[0]), month: null, year: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: toInteger(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
      `${isNumber(date.day) ? padNumber(date.day) : ''}-${isNumber(date.month) ? padNumber(date.month) : ''}-${date.year}` :
      '';
  }
}

@Injectable()
export class I18n {
  language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'], // define custom NgbDatepickerI18n provider
  providers: [I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ]
})
export class StepTwoComponent implements OnInit, OnChanges {
  checkboxshow = false;
  nbr=0;
  alert = true;
  flag: boolean = true;
  collapsed2 = true;
  @Input() price = new Price();
  @Input() expedition = new Expedition();
  packagingCategorie: PackagingCategorie[] = [];
  step2_form: FormGroup;
  package_list_items: FormArray;
  packageID = 0;
  assurencePrice = 0;
  default_service = 'economic';
  selected_service = 'economic';
  closing_hour = 18;
  before_11 = false;
  submitted2 = false;
  express_zero = false;
  amountSymbol = '';
  discountErrorMessage = '';
  priceSelected = new PriceType();
  discountCode = new DiscountCodes();
  discountInput = new FormControl(['']);

  constructor(private fb: FormBuilder,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              private commandService: CommandService,
              config: NgbDatepickerConfig,
              private wizard: WizardComponent,
              private spinnerService: Ng4LoadingSpinnerService) {
    // this.start();
    const currentDate = new Date();
    config.minDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate() + 1
    };
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
    // step2 Form
    this.step2_form = this.fb.group({
      deliveryService: ['', Validators.required],
      pickingDate: ['', Validators.required],
      pickingTime: ['after', Validators.required],
      // recPaymentMethod: [''],
      publicCode: [''],
      discountCode: [''],
      discountInput: [''],
      package_list_items: this.fb.array([]),
    });
    this.package_list_items = this.step2_form.get('package_list_items') as FormArray;

    this.serviceType.setValue(this.default_service);
    this.serviceType.valueChanges.subscribe(
      value => {
        this.selected_service = value;
        this.priceSelected = this.simulate();
        this.pickupDate.setValue('');
        // Checking if the selected offer is express
        if (value === 'express') {

          // Checking if the Fr timezone is summer hour
          if (currentDate.getTimezoneOffset() === -120) {
            // Checking if today's Hour si less than 17H so the picking is open for today else
            // it's the picking will be available from tomorrow : getDate +1
            if (currentDate.getHours() - 1 < this.closing_hour) {
              config.minDate.day = currentDate.getDate() + 0;
            } else {
              config.minDate.day = currentDate.getDate() + 1;
            }
          } else {
            // if it's not summer Hour
            if (currentDate.getHours() < this.closing_hour) {
              config.minDate.day = currentDate.getDate() + 0;
            } else {
              config.minDate.day = currentDate.getDate() + 1;
            }
          }
        } else {
          // if it's not an express service
          config.minDate.day = currentDate.getDate() + 1;
        }
      }
    );
    this.pickupDate.valueChanges.subscribe(
      value => {
        // console.log(currentDate.getMinutes());
        // When changing the picking up date check if it's defined as an object that means it's a date
        if ((typeof value === 'object') && (value !== undefined) && (value !== null)) {
          // if the selected date is today then check if timezone is summer to allow disabling/enabling before 11H
          if ((value.year === currentDate.getFullYear()) &&
            (value.month === currentDate.getMonth() + 1) &&
            (value.day === currentDate.getDate())) {
            if (currentDate.getTimezoneOffset() === -120) {
              if ((currentDate.getHours() - 1 <= 9) && (currentDate.getMinutes() <= 30)) {
                return this.before_11 = false;
              } else {
                this.pickupTime.setValue(''); // resetting the select box
                return this.before_11 = true; // returning a disabled value for before 11H
              }
            } else {
              if ((currentDate.getHours() <= 10) && (currentDate.getMinutes() <= 30)) {
                return this.before_11 = false;
              } else {
                this.pickupTime.setValue(''); // resetting the select box
                return this.before_11 = true; // returning a disabled value for before 11H
              }
            }
          } else {
            this.before_11 = false;
          }
        }
      }
    );

    this.pickupTime.valueChanges.subscribe(
      value => {
        this.priceSelected = this.simulate();
      }
    );
    this.step2_form.get('package_list_items').valueChanges.subscribe(value => {
      if (this.expedition.packages.length === value.length) {
        this.priceSelected = this.simulate();
      }
    });
  }

  get serviceType() {
    return this.step2_form.get('deliveryService');
  }

  get pickupDate() {
    return this.step2_form.get('pickingDate');
  }

  get pickupTime() {
    return this.step2_form.get('pickingTime');
  }

  get discountAmount() {
    return this.step2_form.get('discountInput');
  }

  // Convert Date need to be added when submitting the form
  convertDate(date_val) {
    const myDate = this.ngbDateParserFormatter.format(date_val); // e.g. myDate = 2017-01-01
    this.pickupDate.setValue(myDate);
  }

  // Create the document/package dimensions
  createPackage(pack: Package): FormGroup {
    return this.fb.group({
      packageID: [this.packageID, Validators.required],
      length: [pack.length],
      width: [pack.width],
      height: [pack.height],
      weight: [pack.weight],
      insurancePrice: [0],
      recMontant: [0],
      recoveryMethod: [],
      recoveryPrice: [false],
      insurance: [0],
      packagingType: [null],
    });
  }

  simulate(): PriceType {


    let simPrice = new PriceType();
    // console.log(simPrice);
    if (this.serviceType.value === 'economic') {
      simPrice.totalExVat = this.price.economicPrice.totalExVat;
      simPrice.vat = this.price.economicPrice.vat;
      simPrice.totalIncVat = this.price.economicPrice.totalIncVat;
    }
    if (this.serviceType.value === 'express') {
      simPrice.totalExVat = this.price.expressPrice.totalExVat;
      simPrice.vat = this.price.expressPrice.vat;
      simPrice.totalIncVat = this.price.expressPrice.totalIncVat;
      if (this.pickupTime.value === 'before') {
        simPrice = simPrice.beforePrice();
      }
    }
    if (this.serviceType.value === 'quick') {
      simPrice.totalExVat = this.price.quickPrice.totalExVat;
      simPrice.vat = this.price.quickPrice.vat;
      simPrice.totalIncVat = this.price.quickPrice.totalIncVat;
      if (this.pickupTime.value === 'before') {
        simPrice = simPrice.beforePrice();
      }
    }
    let adons = 0;
    for (let j = 0; j < this.package_list_items.length; j++) {
      adons += this.package_list_items.at(j).get('insurance').value;
      for (let pack of this.packagingCategorie) {
        for (let packType of pack.packagingTypePrice) {
          if (packType.type === this.package_list_items.at(j).get('packagingType').value)
            adons += packType.price;
        }
      }
      // if (this.package_list_items.at(j).get('packagingType').value === 'plastique') {
      //   adons += 2;
      // }
      // if (this.package_list_items.at(j).get('packagingType').value === 'carton') {
      //   adons += 3;
      // }
      if (this.package_list_items.at(j).get('recoveryPrice').value) {
        adons += this.price.recoveryPrice;
      }
    }
    simPrice.totalExVat += adons;
    if (this.discountCode.amount !== undefined) {
      this.discountCode.applyDiscount(simPrice);
    }
    simPrice.totalExvatChange();
    return simPrice;
  }

  onBack() {
    window.scroll(0, 300);
    this.spinnerService.show();
    const publicCode = localStorage.getItem('publicCode');
    localStorage.removeItem('publicCode');
    this.commandService.deleteExpedition(publicCode).subscribe(response => {


        let len = this.package_list_items.length;

        for (let index = 0; index < len; index++) {
          this.package_list_items.removeAt(0);
          this.expedition.packages.splice(0, 1);
        }

        this.expedition.packages = [];
        this.discountCode = new DiscountCodes();
        this.step2_form.get('discountInput').setValue('');
        this.spinnerService.hide();

      },
      error => {
        // console.log(error);
        this.spinnerService.hide();
      });
  }

  expeditionCode() {
    this.step2_form.get('publicCode').setValue(localStorage.getItem('publicCode'));
  }

  onSubmit2() {
    if (this.step2_form.valid) {
      this.submitted2 = true;
      this.convertDate(this.pickupDate.value);
      // console.log(this.step2_form.value);
      this.expeditionCode();
      this.spinnerService.show();
      window.scroll(0, 300);
      console.log(this.step2_form.value);
      this.commandService.updateExpedition(this.step2_form.value).subscribe(response => {
          // console.log(response);
          this.submitted2 = false;
          this.pickupDate.reset();
          this.wizard.navigation.goToNextStep();
        },
        error => {
          // console.log(error);
          // this.httpError = error.error;
          this.spinnerService.hide();
          // console.log(error.error);
          window.scroll(0, 300);
          this.submitted2 = false;
        }
      );
    } else {
      this.submitted2 = false;
      this.step2_form.setErrors({
        invalidForm: true
      });
      window.scroll(0, 300);
      // pickupDate.hasError('required') && step2form.submitted && pickupDate.invalid
      console.log(this.pickupDate.hasError('required'));
      console.log(this.pickupDate);
      //console.log(this.step2form.submitted);
      console.log(this.pickupDate.invalid);
      // console.log('not valid');
      // console.log(this.step2_form.value);
    }


  }


  ngOnInit() {

    this.commandService.getPackagingType().subscribe(packagingCategorie => {
        this.packagingCategorie = packagingCategorie['payload'].map(pack => new PackagingCategorie().deserializable(pack));
        // console.log(this.packagingCategorie);
      },
      error => {
        // console.log(error);
      });

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.expedition.packages);
    if (this.expedition.packages.length > 0) {
      // console.log('it works');
      this.expedition.packages.map(pack => {
        this.package_list_items.push(this.createPackage(pack));
      });
      this.priceSelected.totalExVat = this.price.economicPrice.totalExVat;
      this.priceSelected.vat = this.price.economicPrice.vat;
      this.priceSelected.totalIncVat = this.price.economicPrice.totalIncVat;
    }
    // console.log('initial priceSelected');
    // console.log(this.priceSelected);
    // console.log('expedition info');
    // console.log(this.expedition);
    // console.log('price info');
    // console.log(this.price);
    //
    //   console.log('express brut price:' + this.price.expressPrice.totalExVat);
  }

  onDiscount() {
    this.commandService.getDiscountCode(this.step2_form.get('discountInput').value).subscribe(discount => {
      this.discountCode = discount;
      // console.log(this.discountCode);
      if (this.discountCode.type === 'percentage') {
        this.amountSymbol = '%';
      } else {
        this.amountSymbol = 'DT';
      }
      this.priceSelected = this.simulate();
      this.step2_form.get('discountCode').setValue(discount.code);
    }, error => {
      // console.log('error:');
      // console.log(error);
      this.discountAmount.setErrors({
        invalidForm: true
      });
      if (error.error.code === 400) {
        this.discountErrorMessage = 'Entrez un code';
      } else if (error.error.code === 404) {
        this.discountErrorMessage = 'Code invalide';
      } else if (error.error.code === 401) {
        this.discountErrorMessage = 'Code expiré';
      } else {
        this.discountErrorMessage = 'erreur technique essayez plus tard';
      }
      this.discountCode = new DiscountCodes();
      this.priceSelected = this.simulate();
      this.step2_form.get('discountCode').setValue('');
    });
    // console.log(this.step2_form.get('discountInput').value);

  }

  getInssurencePrice(id) {
    // console.log('even');
    this.commandService.getAssurencePrice(this.package_list_items.at(id).get('insurancePrice').value).subscribe(response => {
      this.package_list_items.at(id).get('insurance').setValue(response['payload'].assurence);
      this.priceSelected = this.simulate();
      // console.log(this.expedition.packages);
    });
  }

  // Calc Decimal two digits package
  calcDec(val) {
    return Number.parseFloat(val).toPrecision(4);
  }

  checkCollapse2(event) {
    // console.log(event.nextState);
    this.collapsed2 = event.nextState;
  }


  FieldsChange(index, e) {



    let targetInput = e.target.parentElement.parentElement.nextElementSibling.querySelector('input');
    let targetSelect = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.querySelector('select');
    let targetcheck = e.target.parentElement.parentElement.querySelectorAll('input[type=checkbox]');


    let rec = document.getElementById('methode-rec');

    if (this.package_list_items.at(index).get('recoveryPrice').value != true) {
      this.package_list_items.at(index).get('recMontant').disable();
      this.package_list_items.at(index).get('recoveryMethod').disable();
      // e.target.parentElement.parentElement.nextElementSibling.style.display = 'none'
      targetInput.style.display = 'none';
      targetSelect.style.display = 'none';
      this.nbr--;

    } else {

      this.package_list_items.at(index).get('recMontant').enable();
      this.package_list_items.at(index).get('recoveryMethod').enable();
      this.package_list_items.at(index).get('recoveryMethod').setValue('espèces');
      // e.target.parentElement.parentElement.nextElementSibling.style.display = 'block'
      targetInput.style.display = 'block';
      targetSelect.style.display = 'block';
      this.nbr++;

    }
    /*if(this.nbr === 0)
    {
      this.step2_form.get('recPaymentMethod').setValue('');
    } else if ((this.step2_form.get('recPaymentMethod').value === '') && (this.nbr > 0)) {
      this.step2_form.get('recPaymentMethod').setValue('espèces');
    }*/
    // if (this.package_list_items.at(index).get('recoveryPrice').status=='VALID'){
    //
    // }


  }


}
