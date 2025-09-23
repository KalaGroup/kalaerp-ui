import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leaveapplications } from './leaveapplications';

describe('Leaveapplications', () => {
  let component: Leaveapplications;
  let fixture: ComponentFixture<Leaveapplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leaveapplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leaveapplications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
