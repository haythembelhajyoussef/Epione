import { TestBed } from '@angular/core/testing';

import { DoctolibService } from './doctolib.service';

describe('DoctolibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctolibService = TestBed.get(DoctolibService);
    expect(service).toBeTruthy();
  });
});
