import { TestBed } from '@angular/core/testing';
import { EmployeeLeaveBalanceservice } from './employeeleavebalanceservice';

describe('EmployeeLeaveBalanceservice', () => {
  let service: EmployeeLeaveBalanceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLeaveBalanceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});