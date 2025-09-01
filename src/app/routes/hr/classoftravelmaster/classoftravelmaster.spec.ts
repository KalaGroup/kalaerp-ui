import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Classoftravelmaster } from './classoftravelmaster';

describe('Classoftravelmaster', () => {
  let component: Classoftravelmaster;
  let fixture: ComponentFixture<Classoftravelmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Classoftravelmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Classoftravelmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
