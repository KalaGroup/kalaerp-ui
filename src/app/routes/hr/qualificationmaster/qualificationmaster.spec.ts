import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qualificationmaster } from './qualificationmaster';

describe('Qualificationmaster', () => {
  let component: Qualificationmaster;
  let fixture: ComponentFixture<Qualificationmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qualificationmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qualificationmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
