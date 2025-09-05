import { TestBed } from '@angular/core/testing';
import { kpaservice } from './kpaservice';




describe('Responsibilitiesmstservice', () => {
    let service: kpaservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(kpaservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});