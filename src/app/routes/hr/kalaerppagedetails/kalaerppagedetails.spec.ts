import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kalaerppagedetails } from './kalaerppagedetails';

describe('Kalaerppagedetails', () => {
  let component: Kalaerppagedetails;
  let fixture: ComponentFixture<Kalaerppagedetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kalaerppagedetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kalaerppagedetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
