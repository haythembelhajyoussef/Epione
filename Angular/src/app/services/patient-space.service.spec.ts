import { TestBed } from '@angular/core/testing';

import { PatientSpaceService } from './patient-space.service';

describe('PatientSpaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientSpaceService = TestBed.get(PatientSpaceService);
    expect(service).toBeTruthy();
  });
});
