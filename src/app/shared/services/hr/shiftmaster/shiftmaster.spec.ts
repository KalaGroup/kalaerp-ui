import { TestBed } from '@angular/core/testing';
import { shiftmasterservice } from './shiftmaster';



describe('Qualificationtypeservice', () => {
  let service: shiftmasterservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(shiftmasterservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});