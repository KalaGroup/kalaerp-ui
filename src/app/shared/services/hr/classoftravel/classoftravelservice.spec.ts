import { TestBed } from '@angular/core/testing';
import { classoftravelservice } from './classoftravelservice';



describe('Companyservice', () => {
    let service: classoftravelservice;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(classoftravelservice);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});