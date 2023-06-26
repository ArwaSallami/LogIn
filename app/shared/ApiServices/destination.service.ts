import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DestinationService {
private modelSource = new BehaviorSubject<any>({});
currentModel = this.modelSource.asObservable();
  constructor() { }
  changeModel(model) {
    this.modelSource.next(model);
  }
}
