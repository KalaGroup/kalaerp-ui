import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQualification } from './add-edit-qualification';

describe('AddEditQualification', () => {
  let component: AddEditQualification;
  let fixture: ComponentFixture<AddEditQualification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditQualification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQualification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
