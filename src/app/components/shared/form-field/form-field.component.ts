import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  @Input() name!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() formGroup!: FormGroup;

  Object = Object;

  formErrorsConfig: { [key: string]: string } = {};

  constructor() {}

  ngOnInit(): void {
    this.setFormErrorsConfig();
  }

  private setFormErrorsConfig() {
    this.formErrorsConfig = {
      required: `${this.label} is required`,
      email: `${this.label} needs to be a valid email`,
      minlength: `${this.label} needs to be at least 6 characters long`,
    };
  }
}
