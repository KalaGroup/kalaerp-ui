import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recruitmentreferencemaster } from './recruitmentreferencemaster';

describe('Recruitmentreferencemaster', () => {
  let component: Recruitmentreferencemaster;
  let fixture: ComponentFixture<Recruitmentreferencemaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recruitmentreferencemaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recruitmentreferencemaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
