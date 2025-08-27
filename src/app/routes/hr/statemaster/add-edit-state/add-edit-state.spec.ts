import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditState } from './add-edit-state';

describe('AddEditState', () => {
  let component: AddEditState;
  let fixture: ComponentFixture<AddEditState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
