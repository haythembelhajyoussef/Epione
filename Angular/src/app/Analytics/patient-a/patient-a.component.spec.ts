import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAComponent } from './patient-a.component';

describe('PatientAComponent', () => {
  let component: PatientAComponent;
  let fixture: ComponentFixture<PatientAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
