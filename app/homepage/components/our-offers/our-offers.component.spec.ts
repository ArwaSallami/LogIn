import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurOffersComponent } from './our-services.component';

describe('OurServicesComponent', () => {
  let component: OurOffersComponent;
  let fixture: ComponentFixture<OurOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
