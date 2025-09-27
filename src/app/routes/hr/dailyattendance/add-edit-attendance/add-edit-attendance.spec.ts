import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAttendance } from './add-edit-attendance';

describe('AddEditAttendance', () => {
  let component: AddEditAttendance;
  let fixture: ComponentFixture<AddEditAttendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAttendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAttendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
