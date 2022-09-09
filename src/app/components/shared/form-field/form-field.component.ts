import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() name!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() formGroup!: FormGroup;
  @Input() errorConfig!: { [key: string]: string };

  constructor() {}

  getErrorMessage() {
    const errorKey = Object.keys(
      this.formGroup.controls?.[this.name]?.errors || {}
    )[0];
    return (errorKey && this.errorConfig?.[errorKey]) || '';
  }
}
