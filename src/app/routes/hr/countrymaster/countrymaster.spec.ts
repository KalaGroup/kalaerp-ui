import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Countrymaster } from './countrymaster';

describe('Countrymaster', () => {
  let component: Countrymaster;
  let fixture: ComponentFixture<Countrymaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Countrymaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Countrymaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
