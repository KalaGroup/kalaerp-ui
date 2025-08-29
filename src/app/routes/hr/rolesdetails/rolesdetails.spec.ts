import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rolesdetails } from './rolesdetails';

describe('Rolesdetails', () => {
  let component: Rolesdetails;
  let fixture: ComponentFixture<Rolesdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rolesdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rolesdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
