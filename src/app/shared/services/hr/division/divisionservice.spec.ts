import { TestBed } from '@angular/core/testing';
import { Divisionservice } from './divisionservice';

describe('Divisionservice', () => {
  let service: Divisionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Divisionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});