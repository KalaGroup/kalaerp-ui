import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gatepasstype } from './gatepasstype';

describe('Gatepasstype', () => {
  let component: Gatepasstype;
  let fixture: ComponentFixture<Gatepasstype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gatepasstype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gatepasstype);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
