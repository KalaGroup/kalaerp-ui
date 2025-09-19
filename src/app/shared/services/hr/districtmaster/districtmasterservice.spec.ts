import { TestBed } from '@angular/core/testing';

import { Districtmasterservice } from './districtmasterservice';

describe('Districtmasterservice', () => {
  let service: Districtmasterservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Districtmasterservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
