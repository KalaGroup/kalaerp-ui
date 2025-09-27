import { TestBed } from '@angular/core/testing';
import { KalaErpPageDetailsservice } from './kalaerppagedetailsservice';

describe('KalaErpPageDetailsservice', () => {
  let service: KalaErpPageDetailsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KalaErpPageDetailsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
