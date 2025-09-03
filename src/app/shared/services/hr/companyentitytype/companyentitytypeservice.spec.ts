import { TestBed } from '@angular/core/testing';
import { Companyentitytypeservice } from './companyentitytypeservice';

describe('Companyentitytypeservice', () => {
  let service: Companyentitytypeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Companyentitytypeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
