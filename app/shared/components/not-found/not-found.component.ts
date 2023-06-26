import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent{
    NotFoundContent = {
        image: 'assets/img/not-found.png',
        // text: 'Essayez de rafraichir la page ou retournez à la page d’accueil',
        text: 'La page que vous cherchez est en cours de construction'
    };
  constructor() { }

}
