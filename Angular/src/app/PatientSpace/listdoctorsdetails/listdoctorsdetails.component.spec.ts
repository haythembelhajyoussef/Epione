import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdoctorsdetailsComponent } from './listdoctorsdetails.component';

describe('ListdoctorsdetailsComponent', () => {
  let component: ListdoctorsdetailsComponent;
  let fixture: ComponentFixture<ListdoctorsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdoctorsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdoctorsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
