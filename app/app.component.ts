import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('fadeAnimation', [
            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({opacity: 1})),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({opacity: 0}),
                animate(300 )
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
                animate(300, style({opacity: 0})))
        ])
    ]
})
export class AppComponent {
  title = 'La coopérative de distribution';
}
