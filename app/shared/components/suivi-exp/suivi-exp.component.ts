import {Component, OnInit, ViewChild} from '@angular/core';
import {CommandService} from '../../ApiServices/command.service';
import {Expedition} from '../../Models/expedition';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Addresse} from '../../Models/addresse';
import {WizardComponent} from 'angular-archwizard';
import {ParcourExpedition} from '../../Models/parcourExpedition';
import {StatusParcourExpedition} from '../../Models/statusParcourExpedition';
import {Detaill} from '../../Models/price';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-suivi-exp',
  templateUrl: './suivi-exp.component.html',
  styleUrls: ['./suivi-exp.component.scss']
})
export class SuiviExpComponent implements OnInit {

  @ViewChild(WizardComponent) public wizard: WizardComponent;

  private error = false;
  private info = false;
  private searchForm: FormGroup ;
  private expedition = new Expedition();
  private isSubmitting = false;

  depAdress = new Addresse();
  desAdress = new Addresse();
  detaills: Detaill[] = [];
  constructor(private commandService: CommandService,
              private fb: FormBuilder, private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({
      searchBox : ['', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ] ]
    });
  }

  get searchBox() {
    return this.searchForm.get('searchBox');
  }

  ngOnInit() {
    let publicCode = this.route.snapshot.paramMap.get('publicCode');
    let qrCode = localStorage.getItem('qrCode');
    if(publicCode !== null) {
      this.searchBox.setValue(publicCode);
      this.searchForExpedition(publicCode);
      localStorage.removeItem('qrCode');
    } else if (qrCode !== null) {
      this.searchBox.setValue(qrCode);
      this.searchForExpedition(qrCode);
      localStorage.removeItem('qrCode');
    }

  }
  searchForExpedition(data) {
    if (this.searchBox.valid) {
      this.isSubmitting = true;
      this.commandService.getExpedition(data).subscribe(response => {
        this.isSubmitting = false;
        if (response.status !== 'draft') {
          this.error = false;
          this.info = true;
          this.expedition = response;
          this.expedition.addresses.map(add => {
            if (add.type === 'DEPARTURE') {
              this.depAdress = add;
            }
            if (add.type === 'DESTINATION') {
              this.desAdress = add;
            }
          });
        } else {
          this.error = true;
          this.info = false;
        }
      }, error => {
      this.isSubmitting = false;
        this.error = true;
        this.info = false;
      }, () => {
        this.isSubmitting = false ;
        if (this.info === true) {
          if (this.expedition.status !== 'draft') {
            setTimeout(() => {
              try {
                let found = false;
                let stepStatus = this.getStatusStep();
                this.wizard.wizardSteps.map(step => {
                  if (step.stepTitle !== stepStatus && !found) {
                    step.selected = false;
                    step.completed = true;
                    //this.wizard.navigation.goToNextStep();
                  } else if (step.stepTitle === stepStatus) {
                    step.selected = true;
                    step.completed = true;
                    found = true;

                  } else {
                    step.selected = false;
                    step.completed = false;
                  }

                });
              } catch (e) {
                console.log('catch');
                //this.wizard.navigation.goToNextStep();
              }
              this.setExpeditionDetaill();
            }, 0);

          }
        }
      });
    }

  }
  setExpeditionDetaill() {
    if (this.detaills.length > 0) {
      this.detaills = [];
    }
    let det = new Detaill();
    det.description = 'Creation de commande';
    det.localisation = this.expedition.depCity;
    det.date = this.expedition.createdAt;
    this.detaills.push(det);
    const activeParcours: ParcourExpedition[] = [];
    this.expedition.parcoursExpeditions.map( par => {
      if ((par.active || par.success) ) {
        activeParcours.push(par);
      }
    });
    if (activeParcours.length > 0) {
      activeParcours.map(ap => {
        if (ap.type === 'collect' ) {
          // let collectPar =  activeParcours.filter(pr =>  pr.type === 'collect' );
          ap.statusParcourExpeditions.map(spe => {
            det = new Detaill();
            if (spe.type === 'bipPointRelais' && spe.success) {
              det.description = 'Nous avons reçu votre expédition dans notre point de relais';
              det.localisation = this.expedition.depCity;
              det.dataTarget = '#dePointsModalDepart';
              det.date = spe.updatedAt;
              this.detaills.push(det);
            }
            if (spe.type === 'bipMagasinier' && spe.success) {
              det.description = 'Expédition entre dans notre dépôt';
              det.localisation = this.expedition.depot.name;
              det.date = spe.updatedAt;
              this.detaills.push(det);
            }
            if (spe.type === 'bipCouriser' && spe.success) {
              det.description = 'Notre coursier prenez votre expédition';
              det.localisation = this.expedition.depCity;
              det.date =  spe.updatedAt;
              this.detaills.push(det);
            }
          });
        }
        if (ap.type === 'versDepot' && ap.success)
        {
           let detaill = new Detaill();
           detaill.description = "Expedition entre dans notre dépot ";
           detaill.localisation = ap.reciverDepot.name;
           detaill.date = ap.updatedAt;
           this.detaills.push(detaill);
        }
        if (ap.type === 'deliver') {
          ap.statusParcourExpeditions.map(spe => {
            det = new Detaill();
            if ( spe.type === 'bipCoursier' && spe.success) {
              det.description = 'Votre expedition est en cours de liveraison';
              det.localisation = this.expedition.desCity;
              det.date = spe.updatedAt;
              this.detaills.push(det);
            }
            if (spe.type === 'bipPointRelais' && spe.success ) {
              det.description = 'Votre expedition a éte livré a notre point de relais';
              det.localisation = this.expedition.desCity;
              det.date = spe.updatedAt;
              det.dataTarget = '#dePointsModalArrive';
              this.detaills.push(det);
            }
            if (spe.type === 'livrer' && spe.success) {
              det.description = 'Expedition a éte livré avec success';
              det.localisation = this.expedition.desCity;
              det.date = spe.updatedAt;
              this.detaills.push(det);
            }
          });
        }
      });
    }


  }
  getStatusStep(): string {
    let step = '';
    if (this.expedition.status === 'finished') {
      return 'finished';
    }
    if (this.expedition.status === 'inProgress') {
      if (!this.expedition.validationCommercial) {
        return 'start';
      } else {
        let activeparcour: ParcourExpedition;
        this.expedition.parcoursExpeditions.map(parcour => {
          if (parcour.active) {
            activeparcour = parcour;
          }
        });
        if (activeparcour.type === 'versDepot') {
          return 'Depot';
        }
        if ( activeparcour.type === 'collect') {
          let  successStatus: StatusParcourExpedition;
          activeparcour.statusParcourExpeditions.map( ste => {
            if (ste.success) {
              successStatus = ste;
            }
          });
          if (successStatus === null) {
            return 'start';
          } else {
            if (successStatus.type === 'bipPointRelais') {
              return 'PointRelaiDepart';
            } else {
              return 'Depot';
            }
          }
        }
        if (activeparcour.type === 'deliver') {
          let activeStatus: StatusParcourExpedition;
          activeparcour.statusParcourExpeditions.map(ste => {
            if ( ste.active || activeStatus.success) {
              activeStatus = ste;
            }
          });
          if (activeStatus === null) {
            return 'Depot';
          }
          if (activeStatus.type === 'bipCouriser') {
            return 'outForDelivery';
          }
          if (activeStatus.type === 'bipPointRelais') {
            return 'PointRelaiDes';
          }
        }

      }

    }


    return step;
  }
  onSubmit() {
    if (this.searchForm.valid) {
      this.searchForExpedition(this.searchBox.value);
    }
  }

}
