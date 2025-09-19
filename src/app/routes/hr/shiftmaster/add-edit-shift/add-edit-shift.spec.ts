import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditShift } from './add-edit-shift';

describe('AddEditShift', () => {
  let component: AddEditShift;
  let fixture: ComponentFixture<AddEditShift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditShift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditShift);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
