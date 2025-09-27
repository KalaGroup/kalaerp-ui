import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDepartmentbudget } from './add-edit-departmentbudget';

describe('AddEditDepartmentbudget', () => {
  let component: AddEditDepartmentbudget;
  let fixture: ComponentFixture<AddEditDepartmentbudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDepartmentbudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDepartmentbudget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
