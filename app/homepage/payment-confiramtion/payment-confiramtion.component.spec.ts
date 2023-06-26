import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfiramtionComponent } from './payment-confiramtion.component';

describe('PaymentConfiramtionComponent', () => {
  let component: PaymentConfiramtionComponent;
  let fixture: ComponentFixture<PaymentConfiramtionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentConfiramtionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfiramtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
