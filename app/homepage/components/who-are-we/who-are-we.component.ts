import { Component} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-who-are-we',
  templateUrl: './who-are-we.component.html',
  styleUrls: ['./who-are-we.component.scss']
})
export class WhoAreWeComponent {
    constructor(public sanitizer: DomSanitizer){}
    IdentityContent = {
        title: 'Qui Sommes-Nous ?',
          description: [
              {text: "Log’In , de la société Maghreb Logistic Innovation, est la solution innovante de la livraison  de vos colis dans toute la Tunisie .Société spécialisée dans la distribution de colis et de messagerie, basée sur une solution informatique de prise de commande , de simulation de prix instantanés et  d'un tracking en temps réel."},
              {text:"Nous proposons l’intégration d’une solution Addon API pour l’ensemble des sites de E-Commerce ou Market Place."},
              {text: "Nous proposons, un package complet de gestion de vos flux pour externaliser vos services d'enterposage,gestion de stock et transport de vos produits."}
          ]
          ,
        videoUrl: 'https://www.youtube.com/embed/m_ku14b63Tg?controls=0'
      };
}
