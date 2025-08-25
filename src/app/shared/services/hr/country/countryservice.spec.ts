import { TestBed } from '@angular/core/testing';

import { Countryservice } from './countryservice';

describe('Countryservice', () => {
  let service: Countryservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Countryservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
