import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentToUpdateComponent } from './appointment-to-update.component';

describe('AppointmentToUpdateComponent', () => {
  let component: AppointmentToUpdateComponent;
  let fixture: ComponentFixture<AppointmentToUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentToUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentToUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
