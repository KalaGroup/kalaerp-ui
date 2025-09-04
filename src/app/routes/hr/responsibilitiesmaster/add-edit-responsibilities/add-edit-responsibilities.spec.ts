import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditResponsibilities } from './add-edit-responsibilities';

describe('AddEditResponsibilities', () => {
  let component: AddEditResponsibilities;
  let fixture: ComponentFixture<AddEditResponsibilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditResponsibilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditResponsibilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
