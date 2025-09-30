import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGatepasstype } from './add-edit-gatepasstype';

describe('AddEditGatepasstype', () => {
  let component: AddEditGatepasstype;
  let fixture: ComponentFixture<AddEditGatepasstype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditGatepasstype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditGatepasstype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
