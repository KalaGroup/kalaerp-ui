import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPetrolallowance } from './add-edit-petrolallowance';

describe('AddEditPetrolallowance', () => {
  let component: AddEditPetrolallowance;
  let fixture: ComponentFixture<AddEditPetrolallowance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPetrolallowance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPetrolallowance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
