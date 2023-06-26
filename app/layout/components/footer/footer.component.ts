import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

        logoUrl = "assets/img/log-in-logo.svg";
        firstBloc = {
          title: "A propos de nous",
          localisation: "Lot 10 rue de Rades ZI Mghira 2082 Tunis-Tunisie .",
          tel: "71 409 533",
          fax: "71 409 534 (Fax)",
          email: "Contact.innov@log-in.tn",
        };
        secondBloc = {
          title: 'Nos Services',
            services: [
                {service: 'Point Relais'},
                {service: 'Commande assurée'},
                {service: 'Service rapide'},
                {service: 'Suivi en temp réel'},
                {service: 'Paiement en ligne'}
                ]
        };
    thirdBloc = {
        title: "Heure d'ouverture",
        services: [
            {service: 'Du Lundi au vendredi'},
            {service: 'De 08:00H Jusqu’à 20:00H'},
            {service: 'Samedi de 8:00H Jusqu’à'},
            {service: '16:00H'}
        ]
    };
    date = new Date();
    copyright ="Tous droits réservés Ⓒ" +this.date.getFullYear()+"- Log’In";

  constructor() { }


}
