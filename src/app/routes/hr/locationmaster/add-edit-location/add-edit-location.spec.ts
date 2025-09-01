import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLocation } from './add-edit-location';

describe('AddEditLocation', () => {
  let component: AddEditLocation;
  let fixture: ComponentFixture<AddEditLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
