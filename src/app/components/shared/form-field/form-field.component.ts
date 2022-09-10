import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

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
  @Input() options!: any[];
  @Input() errorConfig!: { [key: string]: string };

  filteredOptions$!: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    if (this.type === 'select-autocomplete') {
      this.filteredOptions$ = this.formGroup.controls[
        this.name
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this.filterOptions(value))
      );
    }
  }

  private filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getErrorMessage() {
    const errorKey = Object.keys(
      this.formGroup.controls?.[this.name]?.errors || {}
    )[0];
    return (errorKey && this.errorConfig?.[errorKey]) || '';
  }
}
