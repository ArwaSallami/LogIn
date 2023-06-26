import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSheetComponent } from './billing-sheet.component';

describe('BillingSheetComponent', () => {
  let component: BillingSheetComponent;
  let fixture: ComponentFixture<BillingSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
