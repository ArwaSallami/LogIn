import { Component} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
    ContactTitle = 'Contactez-nous';
    ContactDescription = 'Si vous avez des questions et/ou souhaitez recevoir plus d\'informations sur nous ou nos produits, n\'hésitez pas à nous contacter.';
  constructor() { }


}
