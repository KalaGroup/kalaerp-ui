import { TestBed } from '@angular/core/testing';
import { facilityservices } from './facilityservice';





describe('Countryservice', () => {
    let service: facilityservices;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(facilityservices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});