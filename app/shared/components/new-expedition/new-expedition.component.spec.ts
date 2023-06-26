import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpeditionComponent } from './new-expedition.component';

describe('NewExpeditionComponent', () => {
  let component: NewExpeditionComponent;
  let fixture: ComponentFixture<NewExpeditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExpeditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
