import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Offerletter } from './offerletter';

describe('Offerletter', () => {
  let component: Offerletter;
  let fixture: ComponentFixture<Offerletter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Offerletter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Offerletter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
