import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Districtmaster } from './districtmaster';

describe('DistrictmasterComponent', () => {
  let component: Districtmaster;
  let fixture: ComponentFixture<Districtmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Districtmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Districtmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
