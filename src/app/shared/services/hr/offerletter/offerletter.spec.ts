import { TestBed } from '@angular/core/testing';

import { Offerletter } from './offerletter';

describe('Offerletter', () => {
  let service: Offerletter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Offerletter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
