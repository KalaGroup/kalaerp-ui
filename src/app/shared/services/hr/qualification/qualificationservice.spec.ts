import { TestBed } from '@angular/core/testing';
import { qualificationservices } from './qualificationservice';



describe('Countryservice', () => {
    let service: qualificationservices;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(qualificationservices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});