import { TestBed } from '@angular/core/testing';
import { Activityservcie } from './activityservice';



describe('Responsibilitiesmstservice', () => {
    let service: Activityservcie;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(Activityservcie);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});