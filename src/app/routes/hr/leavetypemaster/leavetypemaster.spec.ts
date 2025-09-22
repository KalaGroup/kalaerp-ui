import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leavetypemaster } from './leavetypemaster';

describe('Leavetypemaster', () => {
  let component: Leavetypemaster;
  let fixture: ComponentFixture<Leavetypemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leavetypemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leavetypemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
