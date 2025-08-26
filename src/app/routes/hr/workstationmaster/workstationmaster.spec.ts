import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workstationmaster } from './workstationmaster';

describe('Workstationmaster', () => {
  let component: Workstationmaster;
  let fixture: ComponentFixture<Workstationmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workstationmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workstationmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
