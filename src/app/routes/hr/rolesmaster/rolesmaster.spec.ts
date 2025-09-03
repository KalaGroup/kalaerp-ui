import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rolesmaster } from './rolesmaster';

describe('Rolesmaster', () => {
  let component: Rolesmaster;
  let fixture: ComponentFixture<Rolesmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rolesmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rolesmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
