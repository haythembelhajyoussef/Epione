import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstlettreComponent } from './firstlettre.component';

describe('FirstlettreComponent', () => {
  let component: FirstlettreComponent;
  let fixture: ComponentFixture<FirstlettreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstlettreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstlettreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
