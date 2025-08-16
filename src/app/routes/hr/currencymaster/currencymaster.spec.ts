import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Currencymaster } from './currencymaster';

describe('Currencymaster', () => {
  let component: Currencymaster;
  let fixture: ComponentFixture<Currencymaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Currencymaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Currencymaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
