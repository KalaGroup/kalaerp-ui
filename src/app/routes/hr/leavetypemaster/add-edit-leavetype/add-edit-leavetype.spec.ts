import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeavetype } from './add-edit-leavetype';

describe('AddEditLeavetype', () => {
  let component: AddEditLeavetype;
  let fixture: ComponentFixture<AddEditLeavetype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditLeavetype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLeavetype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
