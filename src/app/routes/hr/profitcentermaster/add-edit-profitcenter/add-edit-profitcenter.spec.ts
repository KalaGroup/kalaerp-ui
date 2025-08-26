import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProfitcenter } from './add-edit-profitcenter';

describe('AddEditProfitcenter', () => {
  let component: AddEditProfitcenter;
  let fixture: ComponentFixture<AddEditProfitcenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProfitcenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProfitcenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
