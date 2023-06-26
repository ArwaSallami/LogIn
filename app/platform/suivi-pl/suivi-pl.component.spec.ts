import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviPlComponent } from './suivi-pl.component';

describe('SuiviPlComponent', () => {
  let component: SuiviPlComponent;
  let fixture: ComponentFixture<SuiviPlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviPlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviPlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
