import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qualificationtypemaster } from './qualificationtypemaster';

describe('Qualificationtypemaster', () => {
  let component: Qualificationtypemaster;
  let fixture: ComponentFixture<Qualificationtypemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qualificationtypemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qualificationtypemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
