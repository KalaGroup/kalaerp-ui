import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profitcenterbudget } from './profitcenterbudget';

describe('Profitcenterbudget', () => {
  let component: Profitcenterbudget;
  let fixture: ComponentFixture<Profitcenterbudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profitcenterbudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profitcenterbudget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
