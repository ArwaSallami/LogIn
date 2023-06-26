import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import 'bootstrap';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  providers: [NgbCarouselConfig]
})
export class SliderComponent {
    slides = [
        {
         imageUrl: 'assets/img/delivery-guy-service.jpg',
         title: '<span>#1</span> suivez<br>votre envoi ',
         text: 'LOG’IN vous garantit une information en temps réel sur l\'état d\'acheminement de votre colis pout connaître l’heure exacte d’arrivée du chauffeur'
        },
        {
         imageUrl: 'assets/img/delivery-guy-with-woman.jpg',
         title: 'Délais <span>&</span> prix <br>compétitifs',
         text: 'Quelque soit le délai de livraison souhaité par nos clients, LOG’IN dispose des moyens logistiques nécessaires pour répondre à vos attentes à des prix très compétitifs.'
        },
        {
         imageUrl: 'assets/img/delivery-guy-with-car.jpg',
         title: 'des solutions faciles <br><span>&</span> efficaces',
         text: 'Etre client de LOG’IN, c\'est d\'abord avoir l\'assurance que tout est fait pour organiser au mieux vos envois en toute sécurité, dans les meilleurs délais, et avec un suivi en temps réel grâce à une équipe chevronnée et compétente.'
        }
    ];
  constructor(config: NgbCarouselConfig) {
      // customize default values of carousels used by this component tree
      config.interval = 3500;
      config.showNavigationArrows = false;
      config.showNavigationIndicators = true;
  }

}
