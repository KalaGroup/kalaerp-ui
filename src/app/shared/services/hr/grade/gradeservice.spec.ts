import { TestBed } from '@angular/core/testing';
import { Gradeservice } from './gradeservice';

describe('Gradeservice', () => {
  let service: Gradeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gradeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});