import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Positionmaster } from './positionmaster';

describe('Positionmaster', () => {
  let component: Positionmaster;
  let fixture: ComponentFixture<Positionmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Positionmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Positionmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
