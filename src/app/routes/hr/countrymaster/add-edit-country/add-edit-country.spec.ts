import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCountry } from './add-edit-country';

describe('AddEditCountry', () => {
  let component: AddEditCountry;
  let fixture: ComponentFixture<AddEditCountry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCountry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCountry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
