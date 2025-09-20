import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeeleavebalances } from './add-edit-employeeleavebalances';

describe('AddEditEmployeeleavebalances', () => {
  let component: AddEditEmployeeleavebalances;
  let fixture: ComponentFixture<AddEditEmployeeleavebalances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEmployeeleavebalances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmployeeleavebalances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
