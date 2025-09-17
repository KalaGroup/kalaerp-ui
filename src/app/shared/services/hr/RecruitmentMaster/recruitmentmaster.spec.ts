import { TestBed } from '@angular/core/testing';
import { recruitmentmasterservice } from './recruitmentmaster';


describe('Qualificationtypeservice', () => {
  let service: recruitmentmasterservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(recruitmentmasterservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});