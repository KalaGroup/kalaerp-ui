import { TestBed } from '@angular/core/testing';
import { Qualificationtypeservice } from './qualificationtypeservice';

describe('Qualificationtypeservice', () => {
  let service: Qualificationtypeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Qualificationtypeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});