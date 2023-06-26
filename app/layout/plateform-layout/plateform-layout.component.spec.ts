import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateformLayoutComponent } from './plateform-layout.component';

describe('PlateformLayoutComponent', () => {
  let component: PlateformLayoutComponent;
  let fixture: ComponentFixture<PlateformLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateformLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateformLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
