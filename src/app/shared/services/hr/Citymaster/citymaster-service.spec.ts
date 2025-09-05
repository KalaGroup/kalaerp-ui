import { TestBed } from '@angular/core/testing';

import { CitymasterService } from './citymaster-service';

describe('CitymasterService', () => {
  let service: CitymasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitymasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
