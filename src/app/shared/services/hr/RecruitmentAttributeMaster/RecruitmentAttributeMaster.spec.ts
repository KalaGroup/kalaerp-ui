import { TestBed } from '@angular/core/testing';
import { RecruitmentAttributeservices } from './RecruitmentAttributeMasterservices';



describe('Countryservice', () => {
    let service: RecruitmentAttributeservices;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RecruitmentAttributeservices);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});