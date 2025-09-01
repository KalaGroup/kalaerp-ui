import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Locationmaster } from './locationmaster';

describe('Locationmaster', () => {
  let component: Locationmaster;
  let fixture: ComponentFixture<Locationmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Locationmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Locationmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
