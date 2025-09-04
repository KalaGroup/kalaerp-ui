import { TestBed } from '@angular/core/testing';
import { profitcenterservices } from './profitcenterservices';



describe('Countryservice', () => {
    let service: profitcenterservices;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(profitcenterservices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});