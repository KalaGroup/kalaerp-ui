import { TestBed } from '@angular/core/testing';
import { Holidayservice } from './holidayservice';

describe('Holidayservice', () => {
  let service: Holidayservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Holidayservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
