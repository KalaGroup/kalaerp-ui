import { TestBed } from '@angular/core/testing';
import { dailyattendanceservice } from './dailyattendance';


describe('Departmentservice', () => {
  let service: dailyattendanceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(dailyattendanceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});