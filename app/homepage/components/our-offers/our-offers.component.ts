import { Component } from '@angular/core';

@Component({
  selector: 'app-our-offers',
  templateUrl: './our-offers.component.html',
  styleUrls: ['./our-offers.component.scss']
})
export class OurOffersComponent {
    OffersContent = {
        title: 'Nos Avantages',
        description: 'Nos tâcherons toujours à établir un véritable partenariat avec nos clients grâce à une équipe de professionnels à votre service, une  couverture totale du territoire tunisien et une garantie de suivi et traçabilité de vos envois. ',
        blocs: [
            {
                icon_image: 'assets/img/livred-box.svg',
                title: 'Logistique personnalisée',
                description: 'Quelque soit votre secteur d’activité, nous vous offrons une solution adaptée à vos envois'
            },
            {
                icon_image: 'assets/img/delivery-van.svg',
                title: 'envoi express',
                description: 'Vous offrir une panoplie d’offres : économique, rapide, express, personnalisé'
            },
            {
                icon_image: 'assets/img/globe.svg',
                title: 'suivi en temp réel',
                description: 'Vous informer en temps réel et en toute transparence'
            },
            {
                icon_image: 'assets/img/secure-box.svg',
                title: 'Respect des promesses',
                description: 'Tenir les promesses que nous faisons à nos clients'
            },
            {
                icon_image: 'assets/img/delivery-history.svg',
                title: 'Réseau couvrant toute la Tunisie ',
                description: 'Quelque soit votre localisation, nous assurons le ramassage et la livraison de vos envois grâce à nos 500 points relais'
            },
            {
                icon_image: 'assets/img/payment-card.svg',
                title: 'Paiement en ligne',
                description: 'Grâce à notre système ultra sécuritaire, vous pouvez payer en ligne sans déplacement'
            }
            ]
    };
  constructor() { }
}
