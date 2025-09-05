import { TestBed } from '@angular/core/testing';
import { Ctcstructureservice } from './ctcstructureservice';

describe('Ctcstructureservice', () => {
  let service: Ctcstructureservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ctcstructureservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});