import { TestBed } from '@angular/core/testing';
import { WorkstationBudgetservice } from './workstationbudget';





describe('Countryservice', () => {
    let service: WorkstationBudgetservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WorkstationBudgetservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});