import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmp } from './add-edit-emp';

describe('AddEditEmp', () => {
  let component: AddEditEmp;
  let fixture: ComponentFixture<AddEditEmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
