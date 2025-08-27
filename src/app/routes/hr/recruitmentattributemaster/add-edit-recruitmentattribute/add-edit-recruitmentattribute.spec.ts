import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecruitmentattribute } from './add-edit-recruitmentattribute';

describe('AddEditRecruitmentattribute', () => {
  let component: AddEditRecruitmentattribute;
  let fixture: ComponentFixture<AddEditRecruitmentattribute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRecruitmentattribute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRecruitmentattribute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
