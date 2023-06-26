import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Relypoints} from '../../../shared/Models/relypoints';

@Component({
  selector: 'app-suivi-map',
  templateUrl: './suivi-map.component.html',
  styleUrls: ['./suivi-map.component.scss']
})
export class SuiviMapComponent implements OnInit, OnChanges{

 //google maps zoom level
  zoom: number = 9;


  // initial center position for the map
  lat: number = 35.7759115;
  lng: number = 10.1047572;

  @Input() pointRelai = new Relypoints();
  points: Relypoints[] = [];
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.pointRelai) {
      this.points[0] = this.pointRelai;
      this.lat = + this.pointRelai.latitude;
      this.lng = + this.pointRelai.longitude;
    }


  }

}
