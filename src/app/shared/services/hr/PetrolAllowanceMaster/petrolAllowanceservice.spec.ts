import { TestBed } from '@angular/core/testing';
import { PetrolAllowanceservice } from './PetrolAllowanceservice';




describe('Countryservice', () => {
    let service: PetrolAllowanceservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PetrolAllowanceservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});