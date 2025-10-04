import { Component, Inject } from '@angular/core';
import {   MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent} from '@angular/material/dialog';
  import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ValidationErrorData {
  errorsByStep: { [key: string]: string[] };
}

@Component({
  selector: 'app-validation-error-dialog',
  imports: [CommonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatButtonModule],
  templateUrl: './validation-error-dialog.html',
  styleUrl: './validation-error-dialog.scss'
})
export class ValidationErrorDialog {
constructor(
    public dialogRef: MatDialogRef<ValidationErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ValidationErrorData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getStepKeys(): string[] {
    return Object.keys(this.data.errorsByStep).filter(
      step => this.data.errorsByStep[step].length > 0
    );
  }
}
