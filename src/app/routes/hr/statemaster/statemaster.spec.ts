import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statemaster } from './statemaster';

describe('Statemaster', () => {
  let component: Statemaster;
  let fixture: ComponentFixture<Statemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Statemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
