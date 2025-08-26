import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkstation } from './add-edit-workstation';

describe('AddEditWorkstation', () => {
  let component: AddEditWorkstation;
  let fixture: ComponentFixture<AddEditWorkstation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditWorkstation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditWorkstation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
