import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditKpa } from './add-edit-kpa';

describe('AddEditKpa', () => {
  let component: AddEditKpa;
  let fixture: ComponentFixture<AddEditKpa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditKpa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditKpa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
