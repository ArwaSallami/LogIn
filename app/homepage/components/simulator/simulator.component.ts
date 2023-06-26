import { Component } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent {

  SimulatorContent = {
      title: 'Nos solutions logistiques',
      description: 'Quelque soit votre secteur d’activité, vos contraintes technico-commerciales, la fréquence de vos envois,  LOG’IN vous propose des solutions logistiques répondant à vos attentes.',
      imageUrl: 'assets/img/delivery-agent.png',
      advantages: [
          {title: 'Solutions pour le E-commerce'},
          {title: 'Solutions business pour les entreprises'},
          {title: 'Solutions pour les artisants ruraux'},
          {title: 'Solutions pour des particuliers'}
      ]
  };

  constructor() { }
}
