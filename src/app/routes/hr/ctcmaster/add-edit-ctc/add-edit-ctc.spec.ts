import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCtc } from './add-edit-ctc';

describe('AddEditCtc', () => {
  let component: AddEditCtc;
  let fixture: ComponentFixture<AddEditCtc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCtc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCtc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
