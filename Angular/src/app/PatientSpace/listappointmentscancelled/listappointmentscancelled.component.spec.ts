import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListappointmentscancelledComponent } from './listappointmentscancelled.component';

describe('ListappointmentscancelledComponent', () => {
  let component: ListappointmentscancelledComponent;
  let fixture: ComponentFixture<ListappointmentscancelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListappointmentscancelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListappointmentscancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
