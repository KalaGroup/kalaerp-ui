import { TestBed } from '@angular/core/testing';
import { Erppageassignmentrelationshipservice } from './ERPPageAssignmentRelationshipservice';



describe('Employeetypeservice', () => {
  let service: Erppageassignmentrelationshipservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Erppageassignmentrelationshipservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});