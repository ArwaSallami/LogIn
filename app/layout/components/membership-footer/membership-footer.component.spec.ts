import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFooterComponent } from './membership-footer.component';

describe('MembershipFooterComponent', () => {
  let component: MembershipFooterComponent;
  let fixture: ComponentFixture<MembershipFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
