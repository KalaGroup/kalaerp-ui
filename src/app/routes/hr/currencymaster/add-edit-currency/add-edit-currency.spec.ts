import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCurrency } from './add-edit-currency';

describe('AddEditCurrency', () => {
  let component: AddEditCurrency;
  let fixture: ComponentFixture<AddEditCurrency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCurrency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCurrency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
