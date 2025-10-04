import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorDialog } from './validation-error-dialog';

describe('ValidationErrorDialog', () => {
  let component: ValidationErrorDialog;
  let fixture: ComponentFixture<ValidationErrorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationErrorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationErrorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
