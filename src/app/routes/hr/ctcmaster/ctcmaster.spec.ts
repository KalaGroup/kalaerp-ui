import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ctcmaster } from './ctcmaster';

describe('Ctcmaster', () => {
  let component: Ctcmaster;
  let fixture: ComponentFixture<Ctcmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ctcmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ctcmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
