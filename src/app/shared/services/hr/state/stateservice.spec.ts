import { TestBed } from '@angular/core/testing';
import { Stateservice } from './stateservice';

describe('Stateservice', () => {
  let service: Stateservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stateservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
