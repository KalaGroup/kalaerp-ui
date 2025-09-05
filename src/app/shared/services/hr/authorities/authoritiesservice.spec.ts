import { TestBed } from '@angular/core/testing';
import { Authoritiesservice } from './authoritiesservice';

describe('Authoritiesservice', () => {
  let service: Authoritiesservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authoritiesservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});