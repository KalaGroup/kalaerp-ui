import { TestBed } from '@angular/core/testing';

import { Employeetypeservice } from './employeetypeservice';

describe('Employeetypeservice', () => {
  let service: Employeetypeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employeetypeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
