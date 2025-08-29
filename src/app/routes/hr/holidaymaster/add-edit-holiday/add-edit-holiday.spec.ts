import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHoliday } from './add-edit-holiday';

describe('AddEditHoliday', () => {
  let component: AddEditHoliday;
  let fixture: ComponentFixture<AddEditHoliday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditHoliday]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditHoliday);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
