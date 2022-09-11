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
  @Input() errorConfig!: { [key: string]: string };
  @Input() set options(optionsList: any[]) {
    this.transformedOptions = optionsList.map((option) => {
      const displayName =
        typeof option === 'object' ? option.displayName : option;
      return { value: option, displayName };
    });
  }

  transformedOptions!: any[];

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
    return this.transformedOptions.filter((option) =>
      option.displayName.toLowerCase().includes(filterValue)
    );
  }

  getErrorMessage() {
    const errorKey = Object.keys(
      this.formGroup.controls?.[this.name]?.errors || {}
    )[0];
    return (errorKey && this.errorConfig?.[errorKey]) || '';
  }
}
