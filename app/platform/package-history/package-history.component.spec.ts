import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageHistoryComponent } from './package-history.component';

describe('PackageHistoryComponent', () => {
  let component: PackageHistoryComponent;
  let fixture: ComponentFixture<PackageHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
