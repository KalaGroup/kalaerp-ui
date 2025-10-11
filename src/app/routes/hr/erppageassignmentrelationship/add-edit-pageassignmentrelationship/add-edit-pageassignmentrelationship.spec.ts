import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPageassignmentrelationship } from './add-edit-pageassignmentrelationship';

describe('AddEditPageassignmentrelationship', () => {
  let component: AddEditPageassignmentrelationship;
  let fixture: ComponentFixture<AddEditPageassignmentrelationship>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPageassignmentrelationship]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPageassignmentrelationship);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
