import { TestBed } from '@angular/core/testing';
import { LeaveApplicationServices } from './leaveapplication';





describe('Responsibilitiesmstservice', () => {
    let service: LeaveApplicationServices;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LeaveApplicationServices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});