import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profitcentermaster } from './profitcentermaster';

describe('Profitcentermaster', () => {
  let component: Profitcentermaster;
  let fixture: ComponentFixture<Profitcentermaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profitcentermaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profitcentermaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
