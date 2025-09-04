import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Responsibilitiesmaster } from './responsibilitiesmaster';

describe('Responsibilitiesmaster', () => {
  let component: Responsibilitiesmaster;
  let fixture: ComponentFixture<Responsibilitiesmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Responsibilitiesmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Responsibilitiesmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
