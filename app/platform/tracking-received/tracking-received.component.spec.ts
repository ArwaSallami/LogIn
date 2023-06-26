import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingReceivedComponent } from './tracking-received.component';

describe('TrackingReceivedComponent', () => {
  let component: TrackingReceivedComponent;
  let fixture: ComponentFixture<TrackingReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
