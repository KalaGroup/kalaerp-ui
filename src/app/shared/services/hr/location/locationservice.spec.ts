import { TestBed } from '@angular/core/testing';

import { locationservices } from './locationservice';



describe('Countryservice', () => {
    let service: locationservices;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(locationservices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});