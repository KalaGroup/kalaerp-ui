import { TestBed } from '@angular/core/testing';
import { Recruitmentreferencemasterservice } from './recruitmentreferencemaster';



describe('Recruitmentreferencemasterservice', () => {
    let service: Recruitmentreferencemasterservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(Recruitmentreferencemasterservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});