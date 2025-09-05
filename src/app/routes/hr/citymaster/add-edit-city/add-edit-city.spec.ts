import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCityComponent } from './add-edit-city';

describe('AddEditCityComponent', () => {
  let component: AddEditCityComponent;
  let fixture: ComponentFixture<AddEditCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
