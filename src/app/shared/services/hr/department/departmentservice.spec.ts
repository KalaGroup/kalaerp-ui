import { TestBed } from '@angular/core/testing';
import { Departmentservice } from './departmentservice';

describe('Departmentservice', () => {
  let service: Departmentservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Departmentservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});