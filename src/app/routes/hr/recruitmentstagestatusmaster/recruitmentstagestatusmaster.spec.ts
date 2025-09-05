import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recruitmentstagestatusmaster } from './recruitmentstagestatusmaster';

describe('Recruitmentstagestatusmaster', () => {
  let component: Recruitmentstagestatusmaster;
  let fixture: ComponentFixture<Recruitmentstagestatusmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recruitmentstagestatusmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recruitmentstagestatusmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
