import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecruitmentstagestatus } from './add-edit-recruitmentstagestatus';

describe('AddEditRecruitmentstagestatus', () => {
  let component: AddEditRecruitmentstagestatus;
  let fixture: ComponentFixture<AddEditRecruitmentstagestatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRecruitmentstagestatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRecruitmentstagestatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
