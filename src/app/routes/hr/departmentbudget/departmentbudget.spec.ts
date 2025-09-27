import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Departmentbudget } from './departmentbudget';

describe('Departmentbudget', () => {
  let component: Departmentbudget;
  let fixture: ComponentFixture<Departmentbudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Departmentbudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Departmentbudget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
