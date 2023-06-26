import {Component, EventEmitter, Input, OnChanges, OnInit, Output, Pipe, SimpleChanges, ViewChild} from '@angular/core';
import {MapsService} from "../../ApiServices/maps.service";
import {Relypoints} from "../../Models/relypoints";

import {merge, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {InfoWindowManager} from "@agm/core";





@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, OnChanges {


  filter = { acceptWeight: '' , delegation: {name: ''}};


  // google maps zoom level
  zoom: number = 7;


  // initial center position for the map
  lat: number = 35.7759115;
  lng: number = 10.1047572;
  location: Relypoints [] = [];




  currentIW;
  previousIW;


  @Input() pointRelais: Relypoints[] = [];
  @Output() pointRelai = new EventEmitter();
  @Input() destinationMap = false;
  @Output() pointRelaiDes = new EventEmitter();
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public model: any;

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.location
        : this.location.filter(v => v.delegation.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 50))
    );
  }

  formatter = (x: any) => x.delegation.name;
  constructor(private maps: MapsService) {
    //closing previous popup whene opennig new one

  }


  ngOnInit() {
    this.maps.getlocation();



  }



  markerClick(infoWindow, loc) {

      if (this.previousIW) {
      this.currentIW = infoWindow;
      try {
        this.previousIW.close();
      }catch (e) {
        this.previousIW = infoWindow;
      }

    }
      if (this.destinationMap) {
          this.pointRelaiDes.emit(loc);
      } else {
          this.pointRelai.emit(loc);
      }
    this.previousIW = infoWindow;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pointRelais) {
      this.location = this.pointRelais;

    }

  }


checker(e) {
    // console.log(e.target.checked);
    if(e.target.checked) {
      // console.log('im checked');
      this.filter.acceptWeight = 'true';

    }
    else {
      // console.log('return everything');
      this.filter.acceptWeight = '';
    }
}
}
