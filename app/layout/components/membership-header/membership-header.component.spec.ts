import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipHeaderComponent } from './membership-header.component';

describe('MembershipHeaderComponent', () => {
  let component: MembershipHeaderComponent;
  let fixture: ComponentFixture<MembershipHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
