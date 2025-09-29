import { TestBed } from '@angular/core/testing';

import { DepartmentbudgetServices } from './departmentbudget-services';

describe('DepartmentbudgetServices', () => {
  let service: DepartmentbudgetServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentbudgetServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
