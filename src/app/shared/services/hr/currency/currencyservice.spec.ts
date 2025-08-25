import { TestBed } from '@angular/core/testing';

import { Currencyservice } from './currencyservice';

describe('Currencyservice', () => {
  let service: Currencyservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Currencyservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
