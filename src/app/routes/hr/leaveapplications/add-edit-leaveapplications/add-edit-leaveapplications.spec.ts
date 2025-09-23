import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeaveapplications } from './add-edit-leaveapplications';

describe('AddEditLeaveapplications', () => {
  let component: AddEditLeaveapplications;
  let fixture: ComponentFixture<AddEditLeaveapplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditLeaveapplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLeaveapplications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
