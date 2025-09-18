import { TestBed } from '@angular/core/testing';
import { ProfitcenterBudgetservice } from './ProfitcenterBudgetservice';




describe('Countryservice', () => {
    let service: ProfitcenterBudgetservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProfitcenterBudgetservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});