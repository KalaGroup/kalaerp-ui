import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Facilitymaster } from './facilitymaster';

describe('Facilitymaster', () => {
  let component: Facilitymaster;
  let fixture: ComponentFixture<Facilitymaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Facilitymaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Facilitymaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
