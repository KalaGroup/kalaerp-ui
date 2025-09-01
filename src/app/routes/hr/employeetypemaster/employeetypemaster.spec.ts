import { ComponentFixture, TestBed } from '@angular/core/testing';

import { employeetypemaster } from './employeetypemaster';

describe('Employeetypemaster', () => {
  let component: employeetypemaster;
  let fixture: ComponentFixture<employeetypemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [employeetypemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(employeetypemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
