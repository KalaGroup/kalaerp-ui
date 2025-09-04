import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Petrolallowancemaster } from './petrolallowancemaster';

describe('Petrolallowancemaster', () => {
  let component: Petrolallowancemaster;
  let fixture: ComponentFixture<Petrolallowancemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Petrolallowancemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Petrolallowancemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
