import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAuthorities } from './add-edit-authorities';

describe('AddEditAuthorities', () => {
  let component: AddEditAuthorities;
  let fixture: ComponentFixture<AddEditAuthorities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAuthorities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAuthorities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
