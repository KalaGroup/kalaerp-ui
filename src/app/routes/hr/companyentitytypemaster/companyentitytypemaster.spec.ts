import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Companyentitytypemaster } from './companyentitytypemaster';

describe('Companyentitytypemaster', () => {
  let component: Companyentitytypemaster;
  let fixture: ComponentFixture<Companyentitytypemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Companyentitytypemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Companyentitytypemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
