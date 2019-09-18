import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDoctorComponent } from './details-doctor.component';

describe('DetailsDoctorComponent', () => {
  let component: DetailsDoctorComponent;
  let fixture: ComponentFixture<DetailsDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
