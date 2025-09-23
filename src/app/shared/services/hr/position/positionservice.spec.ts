import { TestBed } from '@angular/core/testing';
import { Positionservice } from './positionservice';

describe('Positionservice', () => {
  let service: Positionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Positionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
