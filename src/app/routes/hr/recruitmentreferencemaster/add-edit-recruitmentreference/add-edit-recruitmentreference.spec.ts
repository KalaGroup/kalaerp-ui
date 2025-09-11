import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecruitmentreference } from './add-edit-recruitmentreference';

describe('AddEditRecruitmentreference', () => {
  let component: AddEditRecruitmentreference;
  let fixture: ComponentFixture<AddEditRecruitmentreference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRecruitmentreference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRecruitmentreference);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
