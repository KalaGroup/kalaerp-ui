import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDivision } from './add-edit-division';

describe('AddEditDivision', () => {
  let component: AddEditDivision;
  let fixture: ComponentFixture<AddEditDivision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDivision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDivision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
