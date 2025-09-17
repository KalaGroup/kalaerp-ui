import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recruitmentmaster } from './recruitmentmaster';

describe('Recruitmentmaster', () => {
  let component: Recruitmentmaster;
  let fixture: ComponentFixture<Recruitmentmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recruitmentmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recruitmentmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
