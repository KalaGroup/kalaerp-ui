import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Divisionmaster } from './divisionmaster';

describe('Divisionmaster', () => {
  let component: Divisionmaster;
  let fixture: ComponentFixture<Divisionmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Divisionmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Divisionmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
