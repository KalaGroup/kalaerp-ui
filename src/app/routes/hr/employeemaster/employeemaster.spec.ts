import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeemaster } from './employeemaster';

describe('Employeemaster', () => {
  let component: Employeemaster;
  let fixture: ComponentFixture<Employeemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
