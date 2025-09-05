import { TestBed } from '@angular/core/testing';

import { Recruitmentstagestatusmasterservice } from './recruitmentstagestatusmasterservice';

describe('Recruitmentstagestatusmasterservice', () => {
  let service: Recruitmentstagestatusmasterservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recruitmentstagestatusmasterservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
