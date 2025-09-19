import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDistrictComponent } from './add-edit-district';

describe('AddEditDistrictComponent', () => {
  let component: AddEditDistrictComponent;
  let fixture: ComponentFixture<AddEditDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDistrictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
