import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClass } from './add-edit-class';

describe('AddEditClass', () => {
  let component: AddEditClass;
  let fixture: ComponentFixture<AddEditClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
