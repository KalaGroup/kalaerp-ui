import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gradedesignationfacilityassignment } from './gradedesignationfacilityassignment';

describe('Gradedesignationfacilityassignment', () => {
  let component: Gradedesignationfacilityassignment;
  let fixture: ComponentFixture<Gradedesignationfacilityassignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gradedesignationfacilityassignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gradedesignationfacilityassignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
