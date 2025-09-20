import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOfferletter } from './add-edit-offerletter';

describe('AddEditOfferletter', () => {
  let component: AddEditOfferletter;
  let fixture: ComponentFixture<AddEditOfferletter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditOfferletter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOfferletter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
