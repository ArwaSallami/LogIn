import { Component, OnInit } from '@angular/core';
import {Reclamation} from '../../shared/Models/reclamation';
import {FormControl, FormGroup} from '@angular/forms';
import {CommandService} from '../../shared/ApiServices/command.service';
import {FilterPipe} from 'ngx-filter-pipe';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {


  reclamations: Reclamation[] = [];
  reclamation = new Reclamation();
  reclamationFilter: any = { reference: ''};
  listForm = new FormGroup({
    list: new FormControl('5'),
    searchText: new FormControl('')
  });
  nbrPerPage = 5;
  key = 'publicCode';
  reverse = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  get listnbr() {
    return this.listForm.get('list');
  }
  constructor(private commandService: CommandService, private filterPipe: FilterPipe,
              private spinnerService: Ng4LoadingSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinnerService.show();
    this.commandService.getAllReclamation().subscribe(reclamations => {
      this.reclamations = reclamations;
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
  }
  changeListNumber() {
    let p = this.listnbr.value;
    this.nbrPerPage = +p;
    return p;
  }

}
