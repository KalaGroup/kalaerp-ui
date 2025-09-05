import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Activitymaster } from './activitymaster';

describe('Activitymaster', () => {
  let component: Activitymaster;
  let fixture: ComponentFixture<Activitymaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Activitymaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Activitymaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
