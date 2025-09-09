import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGradedesignationfacilityassignment } from './add-edit-gradedesignationfacilityassignment';

describe('AddEditGradedesignationfacilityassignment', () => {
  let component: AddEditGradedesignationfacilityassignment;
  let fixture: ComponentFixture<AddEditGradedesignationfacilityassignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditGradedesignationfacilityassignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditGradedesignationfacilityassignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
