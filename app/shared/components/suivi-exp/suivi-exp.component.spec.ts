import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviExpComponent } from './suivi-exp.component';

describe('SuiviExpComponent', () => {
  let component: SuiviExpComponent;
  let fixture: ComponentFixture<SuiviExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
