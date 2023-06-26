import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageHistoryReceivedComponent } from './package-history-received.component';

describe('PackageHistoryReceivedComponent', () => {
  let component: PackageHistoryReceivedComponent;
  let fixture: ComponentFixture<PackageHistoryReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageHistoryReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageHistoryReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
