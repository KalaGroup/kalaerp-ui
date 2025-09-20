import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workstationbudget } from './workstationbudget';

describe('Workstationbudget', () => {
  let component: Workstationbudget;
  let fixture: ComponentFixture<Workstationbudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workstationbudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workstationbudget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
