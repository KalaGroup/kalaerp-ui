import { TestBed } from '@angular/core/testing';

import { Responsibilitiesmstservice } from './responsibilitiesmstservice';

describe('Responsibilitiesmstservice', () => {
  let service: Responsibilitiesmstservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Responsibilitiesmstservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
