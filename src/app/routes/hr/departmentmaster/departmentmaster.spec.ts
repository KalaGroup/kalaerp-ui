import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Departmentmaster } from './departmentmaster';

describe('Departmentmaster', () => {
  let component: Departmentmaster;
  let fixture: ComponentFixture<Departmentmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Departmentmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Departmentmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
