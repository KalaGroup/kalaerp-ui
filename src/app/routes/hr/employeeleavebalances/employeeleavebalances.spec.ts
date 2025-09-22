import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeeleavebalances } from './employeeleavebalances';

describe('Employeeleavebalances', () => {
  let component: Employeeleavebalances;
  let fixture: ComponentFixture<Employeeleavebalances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeeleavebalances]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeeleavebalances);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
