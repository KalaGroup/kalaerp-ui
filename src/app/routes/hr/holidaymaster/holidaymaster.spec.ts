import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Holidaymaster } from './holidaymaster';

describe('Holidaymaster', () => {
  let component: Holidaymaster;
  let fixture: ComponentFixture<Holidaymaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Holidaymaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Holidaymaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
