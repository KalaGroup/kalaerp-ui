import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erppageassignmentrelationship } from './erppageassignmentrelationship';

describe('Erppageassignmentrelationship', () => {
  let component: Erppageassignmentrelationship;
  let fixture: ComponentFixture<Erppageassignmentrelationship>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Erppageassignmentrelationship]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erppageassignmentrelationship);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
