import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kpamaster } from './kpamaster';

describe('Kpamaster', () => {
  let component: Kpamaster;
  let fixture: ComponentFixture<Kpamaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kpamaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kpamaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
