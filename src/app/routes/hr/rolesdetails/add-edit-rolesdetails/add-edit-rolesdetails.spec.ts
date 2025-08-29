import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRolesdetails } from './add-edit-rolesdetails';

describe('AddEditRolesdetails', () => {
  let component: AddEditRolesdetails;
  let fixture: ComponentFixture<AddEditRolesdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRolesdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRolesdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
