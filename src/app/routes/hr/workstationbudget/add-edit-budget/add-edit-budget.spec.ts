import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBudget } from './add-edit-budget';

describe('AddEditBudget', () => {
  let component: AddEditBudget;
  let fixture: ComponentFixture<AddEditBudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBudget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
