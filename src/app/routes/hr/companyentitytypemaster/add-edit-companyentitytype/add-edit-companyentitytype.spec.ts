import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCompanyentitytype } from './add-edit-companyentitytype';

describe('AddEditCompanyentitytype', () => {
  let component: AddEditCompanyentitytype;
  let fixture: ComponentFixture<AddEditCompanyentitytype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCompanyentitytype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCompanyentitytype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
