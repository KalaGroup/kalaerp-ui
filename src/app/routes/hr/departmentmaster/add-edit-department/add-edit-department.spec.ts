import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDepartment } from './add-edit-department';

describe('AddEditDepartment', () => {
  let component: AddEditDepartment;
  let fixture: ComponentFixture<AddEditDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
