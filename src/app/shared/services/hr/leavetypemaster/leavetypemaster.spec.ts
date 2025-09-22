import { TestBed } from '@angular/core/testing';
import { LeaveTypeMasterservice } from './leavetypemaster';


describe('Countryservice', () => {
    let service: LeaveTypeMasterservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LeaveTypeMasterservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});