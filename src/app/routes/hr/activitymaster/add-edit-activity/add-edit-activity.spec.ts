import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditActivity } from './add-edit-activity';

describe('AddEditActivity', () => {
  let component: AddEditActivity;
  let fixture: ComponentFixture<AddEditActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditActivity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditActivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
