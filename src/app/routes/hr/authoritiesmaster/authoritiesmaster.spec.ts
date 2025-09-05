import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authoritiesmaster } from './authoritiesmaster';

describe('Authoritiesmaster', () => {
  let component: Authoritiesmaster;
  let fixture: ComponentFixture<Authoritiesmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authoritiesmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Authoritiesmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
