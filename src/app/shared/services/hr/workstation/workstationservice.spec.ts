import { TestBed } from '@angular/core/testing';
import { Workstationservice } from './workstationservice';

describe('Workstationservice', () => {
  let service: Workstationservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Workstationservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
