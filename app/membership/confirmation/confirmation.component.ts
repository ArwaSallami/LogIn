import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/ApiServices/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }
  isConfirmed : boolean;

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      return this.router.navigate(['/']);
    }
    let token = this.route.snapshot.paramMap.get('token');
    if(token){
      this.authService.confirmation(token).subscribe( response => {
        this.isConfirmed = true;
        console.log(response);
      },
       error => {
         this.isConfirmed = false;
        console.log(error);
       } );
    }
  }

}
