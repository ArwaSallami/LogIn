import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  StatisticsContent = [
      {icon: 'assets/img/thrown.svg', amount: '15+', description: 'années de service'},
      {icon: 'assets/img/delivery-van-2.svg', amount: '25K+', description: 'colis livrés'},
      {icon: 'assets/img/happy-face.svg', amount: '5K+', description: 'clients satisfaits'}
  ];
  constructor() { }

}
