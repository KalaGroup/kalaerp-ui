import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recruitmentattributemaster } from './recruitmentattributemaster';

describe('Recruitmentattributemaster', () => {
  let component: Recruitmentattributemaster;
  let fixture: ComponentFixture<Recruitmentattributemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recruitmentattributemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recruitmentattributemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
