import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeetype } from './add-edit-employeetype';

describe('AddEditEmployeetype', () => {
  let component: AddEditEmployeetype;
  let fixture: ComponentFixture<AddEditEmployeetype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEmployeetype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmployeetype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
