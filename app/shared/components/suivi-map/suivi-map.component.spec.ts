import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviMapComponent } from './suivi-map.component';

describe('SuiviMapComponent', () => {
  let component: SuiviMapComponent;
  let fixture: ComponentFixture<SuiviMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
