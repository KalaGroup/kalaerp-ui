import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditKalaerppagedetails } from './add-edit-kalaerppagedetails';

describe('AddEditKalaerppagedetails', () => {
  let component: AddEditKalaerppagedetails;
  let fixture: ComponentFixture<AddEditKalaerppagedetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditKalaerppagedetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditKalaerppagedetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
