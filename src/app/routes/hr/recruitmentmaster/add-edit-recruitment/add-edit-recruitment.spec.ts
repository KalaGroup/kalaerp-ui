import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecruitment } from './add-edit-recruitment';

describe('AddEditRecruitment', () => {
  let component: AddEditRecruitment;
  let fixture: ComponentFixture<AddEditRecruitment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRecruitment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRecruitment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
