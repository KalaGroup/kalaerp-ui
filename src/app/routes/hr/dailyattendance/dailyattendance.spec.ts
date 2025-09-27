import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailyattendance } from './dailyattendance';

describe('Dailyattendance', () => {
  let component: Dailyattendance;
  let fixture: ComponentFixture<Dailyattendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dailyattendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dailyattendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
