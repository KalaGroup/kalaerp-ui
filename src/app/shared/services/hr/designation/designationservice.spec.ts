import { TestBed } from '@angular/core/testing';
import { Designationservice } from './designationservice';

describe('Designationservice', () => {
  let service: Designationservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Designationservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});