import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQualificationtype } from './add-edit-qualificationtype';

describe('AddEditQualificationtype', () => {
  let component: AddEditQualificationtype;
  let fixture: ComponentFixture<AddEditQualificationtype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditQualificationtype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQualificationtype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
