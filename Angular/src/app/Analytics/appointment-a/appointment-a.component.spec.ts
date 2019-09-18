import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAComponent } from './appointment-a.component';

describe('AppointmentAComponent', () => {
  let component: AppointmentAComponent;
  let fixture: ComponentFixture<AppointmentAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
