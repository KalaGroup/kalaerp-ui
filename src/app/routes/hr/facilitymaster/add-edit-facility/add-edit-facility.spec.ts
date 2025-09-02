import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFacility } from './add-edit-facility';

describe('AddEditFacility', () => {
  let component: AddEditFacility;
  let fixture: ComponentFixture<AddEditFacility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFacility]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFacility);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
