import { Component, OnInit } from '@angular/core';
import {debounceTime, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {States} from '../../../shared/ApiServices/states';
import {StatesService} from '../../../shared/ApiServices/states.service';
import {DestinationService} from '../../../shared/ApiServices/destination.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  model;
  states: States[];
  ColiMethod = [
      {id: 1, value: 'suivi', name: 'Suivre Mon Coli'},
      {id: 2, value: 'commande', name: 'Lancer une commande'}
  ];
  DefaultRadio = this.ColiMethod[0].id;
  SelectedRadio;
  private searchForm: FormGroup ;
  constructor(private statesService: StatesService, private data: DestinationService,
              private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      searchBox : ['', Validators.required]
    });
  }
    radioHandler(event: any) {
       return this.SelectedRadio = event.target.value;
    }
    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            map(term => term.length < 1 ? []
                : this.states.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        )
    formatter = (x: {name: string}) => x.name;
    modval() {
        if (typeof this.model === 'object') {
            if (this.model.name !== undefined) {
                this.data.changeModel(this.model);
            }
        }
    }
    ngOnInit() {
        this.statesService.getStates().subscribe( states => {
            this.states = states['payload'];
        });
    }
    get searchBox() {
      return this.searchForm.get('searchBox');
    }
    onSubmit() {
      if (this.searchForm.valid) {
        localStorage.setItem('qrCode',this.searchBox.value);
        return this.router.navigate(['/suivicolis']);

      }
    }
}
