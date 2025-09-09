import { TestBed } from '@angular/core/testing';

import { Gradectcdesignationfacilityservice } from './gradectcdesignationfacilityservice';

describe('Gradectcdesignationfacilityservice', () => {
  let service: Gradectcdesignationfacilityservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gradectcdesignationfacilityservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
