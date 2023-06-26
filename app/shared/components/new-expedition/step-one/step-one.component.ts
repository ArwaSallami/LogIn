import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WizardComponent} from 'angular-archwizard';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {CommandService} from '../../../ApiServices/command.service';
import {DestinationService} from '../../../ApiServices/destination.service';
import {StatesService} from '../../../ApiServices/states.service';
import {States} from '../../../ApiServices/states';
import {AuthService} from '../../../ApiServices/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MapsService} from '../../../ApiServices/maps.service';
import {Relypoints} from '../../../Models/relypoints';


@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class StepOneComponent  implements OnInit {
  depPointValid = false;
  desPointValid = false;
  show=true;
  showdestination=true;
  pointdepart=false;
  pointdest=false;
    nbcolis: number ;
    closeResult: string;
    collapsed = true;
    dest_model = { 'name': '', 'zipCode': ''};
    dep_model = { 'name': '', 'zipCode': ''};
    @ViewChild(WizardComponent)
    DefaultRadio = 'collect';
    HomeRadio = 'collect';
    SelectedRadio = true;
    SelectedRadio2 = true;
    receiver_type = 'professional';
    // Package Detail
    package_type = 'colis';
    package_desc = 'true';
    selected_package = true;
    selected_type = true;
    senderSelectedType = true;
    senderDefaultType = 'particular';
    selected_desc = true;
    step1_form: FormGroup;
    submitted = false;
    package_items: FormArray;
    packID = 0;
    auth_weight = 30;
    auth_dim = 150;
    duplicate_button = 'Dupliquer la ligne';
    states: States[];
    httpError = {'code': '', 'message': ''};
    addClick = 0;
    pointRelais: Relypoints [];
    depPointRelai = new Relypoints();
    desPointRelai = new Relypoints();
    constructor(private fb: FormBuilder,
                private commandService: CommandService,
                private mapService: MapsService,
                private authService: AuthService,
                private wizard: WizardComponent,
                private spinnerService: Ng4LoadingSpinnerService,
                private statesService: StatesService,
                private data: DestinationService,
                private modalService: NgbModal
                ) {
        // step1 form
        this.step1_form = this.fb.group({
            pickUpMethod: ['', Validators.required],
            deliveryMethod: ['', Validators.required],
            depZipCode: [{value: '', disabled: true}, Validators.required],
            depCity: ['', Validators.required],
            destinationType: ['', Validators.required],
            senderType: ['', Validators.required],
            desZipCode: [{value: '', disabled: true}, Validators.required],
            desCity: ['', Validators.required],
            packageType: ['', Validators.required],
            package_items: this.fb.array([this.createItem()]),
            dangerous: ['', Validators.required],
            pointRelaiDep: [''],
            pointRelaiDes: [''],
            content: ['', Validators.required]
        });
        this.package_items = this.step1_form.get('package_items') as FormArray;
        // NgModel is deprecated in NG6 and will be removed in NG7 so to replace it :
        this.step1_form.get('pickUpMethod').setValue(this.DefaultRadio);
        this.step1_form.get('deliveryMethod').setValue(this.HomeRadio);
        this.step1_form.get('destinationType').setValue(this.receiver_type);
        this.step1_form.get('senderType').setValue(this.senderDefaultType);
        this.step1_form.get('packageType').setValue(this.package_type);
        this.step1_form.get('dangerous').setValue(this.package_desc);
        // Detect radio button changes to add validation requirement
        this.step1_form.get('pickUpMethod').valueChanges.subscribe(
            value => {
                const senderCPField = this.step1_form.get('depZipCode');
                const senderGovField = this.step1_form.get('depCity');
                if (value === 'collect') {
                    //senderCPField.enable();
                    senderCPField.setValidators([Validators.required]);
                    senderGovField.enable();
                    senderGovField.setValidators([Validators.required]);
                    this.SelectedRadio = true;
                } else {
                    // senderCPField.disable();
                    // senderCPField.clearValidators();
                    // senderGovField.disable();
                    // senderGovField.clearValidators();
                    this.SelectedRadio = false;
                }

            }
        );
        this.step1_form.get('deliveryMethod').valueChanges.subscribe(
            value => {
                const receiverCPField = this.step1_form.get('desZipCode');
                const receiverGovField = this.step1_form.get('desCity');
                if (value === 'collect') {
                    //receiverCPField.enable();
                    receiverCPField.setValidators([Validators.required]);
                    receiverGovField.enable();
                    receiverGovField.setValidators([Validators.required]);
                    this.SelectedRadio2 = true;
                } else {
                    // receiverCPField.disable();
                    // receiverCPField.clearValidators();
                    // receiverGovField.disable();
                    // receiverGovField.clearValidators();
                    this.SelectedRadio2 = false;
                }

            }
        );
        // Detect radio button changes to add is checked class
        this.step1_form.get('destinationType').valueChanges.subscribe(
            value => {
                if (value === 'professional') {
                    this.selected_type = true;
                } else {
                    this.selected_type = false;
                }
            }
        );
        // Detect radio button changes to add is checked class
        this.step1_form.get('senderType').valueChanges.subscribe(
          value => {
            if (value === 'particular') {
              this.senderSelectedType = true;
            } else {
              this.senderSelectedType = false;
            }
          }
        );
        // Detect radio button changes to add is checked class
        this.step1_form.get('dangerous').valueChanges.subscribe(
            value => {
                if (value === 'true') {
                    this.selected_desc = true;
                } else {
                    this.selected_desc = false;
                }
            }
        );
        // Detect radio button changes to add validation requirement ( package || document )
        this.step1_form.get('packageType').valueChanges.subscribe(
            value => {
                this.package_items = this.step1_form.get('package_items') as FormArray;
                if (value === 'colis') {
                    this.duplicate_button = 'Dupliquer la ligne';
                    this.package_items.enable();
                    // this.package_items.setValidators([Validators.required]);
                    this.selected_package = true;
                } else {
                    this.duplicate_button = 'Dupliquer le document';
                    this.package_items.disable();
                    this.package_items.clearValidators();
                    this.selected_package = false;
                    const formLength = this.package_items.controls.length;
                    for (let _i = 0; _i < formLength; _i++) {
                        this.package_items.at(_i).get('packageID').enable();
                        this.package_items.at(_i).get('packageID').setValidators([Validators.required]);
                        this.package_items.at(_i).get('weight').enable();
                        this.package_items.at(_i).get('weight').setValidators(
                            Validators.compose([Validators.max(this.auth_weight), Validators.required]));
                        this.package_items.at(_i).get('designation').enable();
                      this.package_items.at(_i).get('designation').setValidators([Validators.required]);
                    }
                }
            }
        );
        // if the form is already initiated the package ID will be 1 to prevent double 0 index
        if (this.package_items.length >= 1) {
            this.packID++;
        }
    }

    search = (text$: Observable<string>) =>

        text$.pipe(
            debounceTime(200),
            map(term => term.length < 1 ? []
                : this.states.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )
    formatter = (x: {name: string}) => x.name;
    search2 = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            map(term => term.length < 1 ? []
                : this.states.filter(v => v.zipCode.toString().toLowerCase().indexOf(term.toString().toLowerCase()) > -1).slice(0, 10))
        )
    formatter2 = (x: {zipCode: string }) => x.zipCode;

    // Create the document/package dimensions
    createItem(): FormGroup {
        return this.fb.group({
            packageID: [ this.packID, Validators.required],
            length: ['', Validators.compose([Validators.max(this.auth_dim), Validators.required])],
            width: ['', Validators.compose([Validators.max(this.auth_dim), Validators.required])],
            height: ['', Validators.compose([Validators.max(this.auth_dim), Validators.required])],
            weight: ['', Validators.compose([Validators.max(this.auth_weight), Validators.required])],
            designation: ['', Validators.required],
        });
    }

    //Create packageby nb colis

    nbPackage(){
        this.package_items.disable();
        this.package_items.clearValidators();
        for (let i = 0 ; i < this.nbcolis ; i++){
        console.log("hello" ,this.package_items);
        this.package_items.push(this.createItem());

    }
}

    // Remove All packages except the first line and reset its content
    resetPackages() {
        while (this.package_items.length > 1) {
            this.package_items.removeAt( this.package_items.length - 1);
            this.packID -- ;
        }
        this.package_items.at(0).get('length').reset();
        this.package_items.at(0).get('width').reset();
        this.package_items.at(0).get('height').reset();
        this.package_items.at(0).get('weight').reset();
        this.package_items.at(0).get('designation').reset();
    }
    // Package Info Modal config
    openVerticallyCentered(packageInfo) {
        this.modalService.open(packageInfo, { centered: true, size: 'lg' });
    }
    // Add new package item according to package type ( to add validation requirements )
    addPackageItem(packageInfo): void {
        if (this.addClick === 0) {
            this.openVerticallyCentered(packageInfo);
        }
        this.addClick++;
        if (this.step1_form.get('packageType').value === 'colis') {
            this.package_items.push(this.createItem());
            this.package_items.enable();
            this.package_items.setValidators([Validators.required]);
            this.packID++;
        } else if (this.step1_form.get('packageType').value === 'document') {
            this.package_items.push(this.createItem());
            this.package_items.disable();
            this.package_items.clearValidators();
            this.packID++;
            const formLength = this.package_items.controls.length;



            for (let _i = 0; _i < formLength; _i++) {
                this.package_items.at(_i).get('packageID').enable();
                this.package_items.at(_i).get('packageID').setValidators([Validators.required]);
                this.package_items.at(_i).get('weight').enable();
                this.package_items.at(_i).get('weight').setValidators(
                    Validators.compose([Validators.max(this.auth_weight), Validators.required]));

            }
        }

    }
    duplicatePackageItem(packageInfo): void {
        if (this.addClick === 0) {
            this.openVerticallyCentered(packageInfo);
        }
        this.addClick++;
        const len = this.package_items.controls.length;
        if (this.step1_form.get('packageType').value === 'colis') {
            const pl = this.package_items.at(len - 1).get('length').value;
            const pw = this.package_items.at(len - 1).get('width').value;
            const ph = this.package_items.at(len - 1).get('height').value;
            const pwe = this.package_items.at(len - 1).get('weight').value;
            const pd = this.package_items.at(len - 1).get('designation').value
            this.package_items.push(this.createItem());
            this.package_items.at(len).get('length').setValue(pl);
            this.package_items.at(len).get('width').setValue(pw);
            this.package_items.at(len).get('height').setValue(ph);
            this.package_items.at(len).get('weight').setValue(pwe);
            this.package_items.at(len).get('designation').setValue(pd);
            this.package_items.enable();
            this.package_items.setValidators([Validators.required]);
            this.packID++;
        }

        else if (this.step1_form.get('packageType').value === 'document') {
            const pwe = this.package_items.at(len - 1).get('weight').value;
            this.package_items.push(this.createItem());
            this.package_items.at(len).get('weight').setValue(pwe);
            this.package_items.disable();
            this.package_items.clearValidators();
            this.packID++;
            const formLength = this.package_items.controls.length;
            for (let _i = 0; _i < formLength; _i++) {
                this.package_items.at(_i).get('packageID').enable();
                this.package_items.at(_i).get('packageID').setValidators([Validators.required]);
                this.package_items.at(_i).get('weight').enable();
                this.package_items.at(_i).get('weight').setValidators(
                    Validators.compose([Validators.max(this.auth_weight), Validators.required]));
            }
        }
    }
    // Remove a specific item
    removePackageItem(i) {
        if (this.package_items !== undefined) {
            this.package_items.removeAt(i);
        }
    }
    // Reset Step1  Form
    resetSetop1Form() {
        this.step1_form.get('depZipCode').reset();
        this.step1_form.get('depCity').reset();
        this.step1_form.get('desZipCode').reset();
        this.step1_form.get('desCity').reset();
        // this.step1_form.get('pickingDate').reset();
        this.step1_form.get('content').reset();
        this.resetPackages();
    }
    // Calc Decimal two digits package
    calcDim(event) {
        const input_val = event.target.value;
        event.target.value = parseFloat(input_val).toFixed(1);
    }
    // Validator getters
    get depZipCode() {
        return this.step1_form.get('depZipCode');
    }
    get depCity() {
        return this.step1_form.get('depCity');
    }
    get desZipCode() {
        return this.step1_form.get('desZipCode');
    }
    get desCity() {
        return this.step1_form.get('desCity');
    }
    packageLength(index) {
        return this.package_items.at(index).get('length');
    }
    packageWidth(index) {
        return this.package_items.at(index).get('width');
    }
    packageDesignation(index) {
      return this.package_items.at(index).get('designation');
    }
    packageHeight(index) {
        return this.package_items.at(index).get('height');
    }
    // Getting the specific package weight
    packageWeight(index) {
        return this.package_items.at(index).get('weight');
    }
    // Handling validation error message
    weightError(index) {
        if (this.package_items.at(index).get('weight').hasError('required')) {
            return 'Ce champs est obligatoire';
        } else if (this.package_items.at(index).get('weight').hasError('max')) {
            return 'Poids maximal autorisé: ' + this.auth_weight + 'Kg';
        }
    }
    heightError(index) {
        if (this.package_items.at(index).get('height').hasError('required')) {
            return 'le champ hauteur est obligatoire';
        } else if (this.package_items.at(index).get('height').hasError('max')) {
            return 'hauteur maximale autorisée: ' + this.auth_dim + 'cm';
        }
    }
    widthError(index) {
        if (this.package_items.at(index).get('width').hasError('required')) {
            return 'le champ largeur est obligatoire';
        } else if (this.package_items.at(index).get('width').hasError('max')) {
            return 'largeur maximale autorisée: ' + this.auth_dim + 'cm';
        }
    }
    lengthError(index) {
        if (this.package_items.at(index).get('length').hasError('required')) {
            return 'le champ longeur est obligatoire';
        } else if (this.package_items.at(index).get('length').hasError('max')) {
            return 'longeur maximale autorisée: ' + this.auth_dim + 'cm';
        }
    }
    packageDimError(index) {
        if ((this.package_items.at(index).get('length').value +
            this.package_items.at(index).get('width').value +
            this.package_items.at(index).get('height').value) > 220) {
            // console.log('more than 220cm');
            this.step1_form.setErrors({
                invalidForm: true
            });
            return true;
        } else {
            return false;
        }
    }
    get content() {
        return this.step1_form.get('content');
    }

    recZip() {



      if ( this.desZipCode.value !== undefined) {
        this.dest_model = this.desZipCode.value;
        this.desZipCode.patchValue(this.dest_model.zipCode);
        this.desCity.patchValue(this.dest_model.name);
        if ((this.dest_model.name === undefined) && (this.dest_model.zipCode === undefined)) {
          // console.log('is undefined');
          this.dest_model = {'name': '', 'zipCode': ''};
        }
      }

    }
    recGov() {
      if (this.desCity.value !== undefined) {
        this.dest_model = this.desCity.value;
        this.desZipCode.patchValue(this.dest_model.zipCode);
        this.desCity.patchValue(this.dest_model.name);
        if ((this.dest_model.name === undefined) && (this.dest_model.zipCode === undefined)) {
          // console.log('is undefined');
          this.dest_model = {'name': '', 'zipCode': ''};
        }
      }

    }
    depZip() {
      if ( this.depZipCode.value !== undefined) {
        this.dep_model = this.depZipCode.value;
        this.depZipCode.patchValue(this.dep_model.zipCode);
        this.depCity.patchValue(this.dep_model.name);
        if ((this.dep_model.name === undefined) && (this.dep_model.zipCode === undefined)) {
          // console.log('is undefined');
          this.dep_model = {'name': '', 'zipCode': ''};
        }
      }

    }
    depGov() {
      this.httpError = {'code': '', 'message': ''};
      if (this.depCity.value !== undefined) {
        this.dep_model = this.depCity.value;
        this.depZipCode.patchValue(this.dep_model.zipCode);
        this.depCity.patchValue(this.dep_model.name);
        if ((this.dep_model.name === undefined) && (this.dep_model.zipCode === undefined)) {
          // console.log('is undefined');
          this.dep_model = {'name': '', 'zipCode': ''};
        }
      }
    }
    // Submit step1 form
    onSubmit() {
        if (this.step1_form.valid) {
          this.depZipCode.enable();
          this.desZipCode.enable();
            this.submitted = true;
            // console.log('loading...');
            this.spinnerService.show();
            window.scroll(0, 300);
            this.commandService.addNewExpedition(this.step1_form.getRawValue()).subscribe(response => {
                    this.desZipCode.disable();
                    this.depZipCode.disable();
                    const publicCode = response['payload'].publicCode;
                    localStorage.setItem('publicCode', publicCode);
                    this.wizard.navigation.goToNextStep();
                },
                error => {
                  this.desZipCode.disable();
                  this.depZipCode.disable();

                    this.httpError = error.error;
                    this.spinnerService.hide();
                    // console.log(error.error);
                    window.scroll(0, 300);
                    this.submitted = false;
                },
                () => {
                this.spinnerService.hide();
                // console.log('Done');
                this.submitted = false;
            }
            );
        } else {
            this.submitted = false;
            this.step1_form.setErrors({
                invalidForm: true
            });
          window.scroll(0, 300);
            // console.log('not valid');
            // console.log(this.step1_form.value);
        }
    }
    ngOnInit() {
      console.log(this.wizard);
      let tokenUser = this.authService.getTokenUser();
      if (tokenUser) {
        if(tokenUser.accountType === 'pro') {
          this.senderSelectedType = false;
          this.step1_form.get('senderType').setValue('professional');
        }
      }
      this.statesService.getStates().subscribe( states => {
        this.states = states['payload'];
      });
        // console.log(this.dest_model);
        this.data.currentModel.subscribe(model => {
            if (model.name !== undefined) {
                this.dest_model = model;
                this.desZipCode.setValue(this.dest_model.zipCode);
                this.desCity.setValue(this.dest_model.name);
            }
        });

        this.mapService.getlocation().subscribe( pointRelai => {
          this.pointRelais = pointRelai['payload'];
          //console.log(this.pointRelais);

        });

        // console.log(this.dest_model);
    }
    checkCollapse(event) {
        console.log(event.nextState);
        this.collapsed = event.nextState;
    }
    //map1
    selectedDepPoint(point) {
      this.depPointRelai = point;
      //console.log(this.depPointRelai);
    }
    //map2
    selectedDesPoint(point) {
      this.desPointRelai = point;
      //console.log(this.desPointRelai);
    }
    selectDepPoint() {
      try {
        this.depZipCode.setValue(this.depPointRelai.delegation.zipCode);
        this.depCity.setValue(this.depPointRelai.delegation.name);
        this.step1_form.get('pointRelaiDep').setValue(this.depPointRelai.id);
        this.show = false;
        this.pointdepart = true;
        this.depPointValid = !this.depPointValid;
      } catch (e) {
        console.log('select point');
      }


}
    selectDesPoint() {
      try {
        this.desZipCode.setValue(this.desPointRelai.delegation.zipCode);
        this.desCity.setValue(this.desPointRelai.delegation.name);
        this.step1_form.get('pointRelaiDes').setValue(this.desPointRelai.id);
        this.showdestination = false;
        this.desPointValid = !this.desPointValid;
        this.pointdest = true;
      } catch (e) {
        console.log('select point');
      }


    }
    previousDepMap() {
      this.show = !this.show;
      this.depPointRelai = new Relypoints();
      this.depPointValid = !this.depPointValid;
    }
    previousDesMap() {
      this.showdestination = !this.showdestination;
      this.desPointRelai = new Relypoints();
      this.desPointValid = !this.desPointValid  ;

    }
    validateDepMap() {
      this.show = !this.show;
      this.depPointValid = !this.depPointValid;

    }
    validateDesMap() {
      this.showdestination = !this.showdestination;
      this.desPointValid = !this.desPointValid;
    }
}

