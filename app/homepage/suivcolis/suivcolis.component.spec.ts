import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivcolisComponent } from './suivcolis.component';

describe('SuivcolisComponent', () => {
  let component: SuivcolisComponent;
  let fixture: ComponentFixture<SuivcolisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuivcolisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivcolisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
