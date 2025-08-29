import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeemasterupdationfor } from './add-edit-employeemasterupdationfor';

describe('AddEditEmployeemasterupdationfor', () => {
  let component: AddEditEmployeemasterupdationfor;
  let fixture: ComponentFixture<AddEditEmployeemasterupdationfor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEmployeemasterupdationfor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmployeemasterupdationfor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
