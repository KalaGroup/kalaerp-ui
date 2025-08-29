import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeemasterupdationformaster } from './employeemasterupdationformaster';

describe('Employeemasterupdationformaster', () => {
  let component: Employeemasterupdationformaster;
  let fixture: ComponentFixture<Employeemasterupdationformaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeemasterupdationformaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeemasterupdationformaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
