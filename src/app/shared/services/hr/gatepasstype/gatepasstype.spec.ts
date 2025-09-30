import { TestBed } from '@angular/core/testing';
import { Gatepasstypeservice } from './gatepasstype';

describe('Gatepasstypeservice', () => {
  let service: Gatepasstypeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gatepasstypeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});