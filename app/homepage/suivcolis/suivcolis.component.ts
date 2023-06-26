import {Component, OnInit, ViewChild} from '@angular/core';
import {CommandService} from '../../shared/ApiServices/command.service';
import {Expedition} from '../../shared/Models/expedition';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Addresse} from '../../shared/Models/addresse';
import {WizardComponent} from 'angular-archwizard';
import {ParcourExpedition} from '../../shared/Models/parcourExpedition';
import {StatusParcourExpedition} from '../../shared/Models/statusParcourExpedition';
import {Detaill} from '../../shared/Models/price';


@Component({
  selector: 'app-suivcolis',
  templateUrl: './suivcolis.component.html',
  styleUrls: ['./suivcolis.component.scss']
})
export class SuivcolisComponent implements OnInit {
  ngOnInit(){
  }
}

//   @ViewChild(WizardComponent) public wizard: WizardComponent;
//
//   private error = false;
//   private info = false;
//   private searchForm: FormGroup ;
//   private expedition = new Expedition();
//
//   depAdress = new Addresse();
//   desAdress = new Addresse();
//   detaills: Detaill[] = [];
//   constructor(private commandService: CommandService,
//               private fb: FormBuilder
//   ) {
//     this.searchForm = this.fb.group({
//       searchBox : ['', Validators.required]
//     });
//   }
//
//   get searchBox() {
//     return this.searchForm.get('searchBox');
//   }
//
//   ngOnInit() {
//     let qrCode = localStorage.getItem('qrCode');
//     if (qrCode !== null) {
//       this.searchBox.setValue(qrCode);
//       this.searchForExpedition(qrCode);
//       localStorage.removeItem('qrCode');
//     }
//   }
//   searchForExpedition(data) {
//     this.commandService.getExpedition(data).subscribe( response => {
//       if (response.status !== 'draft') {
//         this.error = false;
//         this.info = true;
//         this.expedition = response;
//         console.log(this.expedition);
//         this.expedition.addresses.map( add => {
//           if (add.type === 'DEPARTURE') {
//             this.depAdress = add; }
//           if (add.type === 'DESTINATION') {
//             this.desAdress = add; }
//         });
//       } else {
//         this.error = true;
//         this.info = false;
//       }
//     }, error => {
//       this.error = true;
//       this.info = false;
//     }, () => {
//       if (this.info === true) {
//         if (this.expedition.status  !== 'draft') {
//           setTimeout(() => {
//             try {
//               let found = false;
//               let stepStatus = this.getStatusStep();
//               this.wizard.wizardSteps.map(step => {
//                 console.log(stepStatus);
//                 if ( step.stepTitle !== stepStatus && !found) {
//                   step.selected = false;
//                   step.completed = true;
//                   //this.wizard.navigation.goToNextStep();
//                 } else if (step.stepTitle === stepStatus) {
//                   step.selected = true;
//                   step.completed = true;
//                   found = true;
//
//                 } else {
//                   step.selected = false;
//                   step.completed = false;
//                 }
//
//               });
//               //this.setExpeditionDetaill();
//               //console.log(this.detaills);
//
//             } catch (e) {
//               console.log('catch');
//               //this.wizard.navigation.goToNextStep();
//             }
//             this.setExpeditionDetaill();
//             console.log(this.detaills);
//             console.log(this.wizard.wizardSteps);
//
//           }, 1000);
//
//         }
//       }
//     });
//
//   }
//   setExpeditionDetaill() {
//     if (this.detaills.length > 0) {
//       this.detaills = [];
//     }
//     let det = new Detaill();
//     det.description = 'Creation de commande';
//     det.localisation = this.expedition.depCity;
//     det.date = this.expedition.createdAt;
//     this.detaills.push(det);
//     let activeParcours: ParcourExpedition[] = [];
//     this.expedition.parcoursExpeditions.map( par => {
//       if ((par.active || par.success) && (par.type !== 'versDepot')) {
//         activeParcours.push(par);
//       }
//     });
//     if (activeParcours.length > 0) {
//       activeParcours.map(ap => {
//         if (ap.type === 'collect' ) {
//           // let collectPar =  activeParcours.filter(pr =>  pr.type === 'collect' );
//           ap.statusParcourExpeditions.map(spe => {
//             det = new Detaill();
//             if (spe.type === 'bipMagasinier' && spe.success) {
//               det.description = 'Expédition entre dans notre dépôt';
//               det.localisation = this.expedition.depot.name;
//               det.date = spe.updatedAt;
//               this.detaills.push(det);
//             }
//             if (spe.type === 'bipCouriser' && spe.success) {
//               det.description = 'Notre coursier prenez votre expédition';
//               det.localisation = this.expedition.depCity;
//               det.date =  spe.updatedAt;
//               this.detaills.push(det);
//             }
//             if (spe.type === 'bipPointRelais' && spe.success) {
//               det.description = 'Nous avons reçu votre expédition dans notre point de relais';
//               det.localisation = this.expedition.depCity;
//               det.date = spe.updatedAt;
//               this.detaills.push(det);
//             }
//           });
//         }
//         if (ap.type === 'deliver') {
//           ap.statusParcourExpeditions.map(spe => {
//             det = new Detaill();
//             if ( spe.type === 'bipCouriser' && spe.success) {
//               det.description = 'Votre expedition est en cours de liveraison';
//               det.localisation = this.expedition.desCity;
//               det.date = spe.updatedAt;
//               this.detaills.push(det);
//             }
//             if (spe.type === 'bipPointRelais' && spe.success ) {
//               det.description = 'Votre expedition a éte livre a notre point de relais';
//               det.localisation = this.expedition.desCity;
//               det.date = spe.updatedAt;
//               this.detaills.push(det);
//             }
//           });
//         }
//       });
//       if(this.expedition.status === 'finished') {
//         det = new Detaill();
//         det.description = 'Expedition a éte livré avec success';
//         det.localisation = this.expedition.desCity;
//         det.date = this.expedition.updatedAt;
//         this.detaills.push(det);
//       }
//     }
//
//
//   }
//   getStatusStep(): string {
//     let step = '';
//     if (this.expedition.status === 'finished') {
//       return 'finished';
//     }
//     if (this.expedition.status === 'inProgress') {
//       if (!this.expedition.validationCommercial) {
//         return 'start';
//       } else {
//         let activeparcour: ParcourExpedition;
//         this.expedition.parcoursExpeditions.map(parcour => {
//           if (parcour.active) {
//             activeparcour = parcour;
//           }
//         });
//         if (activeparcour.type === 'versDepot') {
//           return 'Depot';
//         }
//         if ( activeparcour.type === 'collect') {
//           let  successStatus: StatusParcourExpedition;
//           activeparcour.statusParcourExpeditions.map( ste => {
//             if (ste.success) {
//               successStatus = ste;
//             }
//           });
//           if (successStatus === null) {
//             return 'start';
//           } else {
//             if (successStatus.type === 'bipPointRelais') {
//               return 'PointRelaiDepart';
//             } else {
//               return 'Depot';
//             }
//           }
//         }
//         if (activeparcour.type === 'deliver') {
//           let activeStatus: StatusParcourExpedition;
//           activeparcour.statusParcourExpeditions.map(ste => {
//             if ( ste.active || activeStatus.success) {
//               activeStatus = ste;
//             }
//           });
//           if (activeStatus === null) {
//             return 'Depot';
//           }
//           if (activeStatus.type === 'bipCouriser') {
//             return 'outForDelivery';
//           }
//           if (activeStatus.type === 'bipPointRelais') {
//             return 'PointRelaiDes';
//           }
//         }
//
//       }
//
//     }
//
//
//     return step;
//   }
//   onSubmit() {
//     if (this.searchForm.valid) {
//       this.searchForExpedition(this.searchBox.value);
//     }
//   }
//
// }
