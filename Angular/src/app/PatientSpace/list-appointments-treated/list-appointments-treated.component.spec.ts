import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentsTreatedComponent } from './list-appointments-treated.component';

describe('ListAppointmentsTreatedComponent', () => {
  let component: ListAppointmentsTreatedComponent;
  let fixture: ComponentFixture<ListAppointmentsTreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAppointmentsTreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentsTreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
