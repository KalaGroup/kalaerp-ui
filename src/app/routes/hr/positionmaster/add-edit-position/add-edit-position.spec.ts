import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPosition } from './add-edit-position';

describe('AddEditPosition', () => {
  let component: AddEditPosition;
  let fixture: ComponentFixture<AddEditPosition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPosition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPosition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
