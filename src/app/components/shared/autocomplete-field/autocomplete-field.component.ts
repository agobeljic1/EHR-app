import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  debounceTime,
  filter,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss'],
})
export class AutocompleteFieldComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  @Input() name!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() formGroup!: FormGroup;
  @Input() loading!: boolean | null;
  @Input() options!: any[] | null;
  @Input() errorConfig!: { [key: string]: string };

  @Output() onChangeCallback = new EventEmitter();
  @Output() onSelectCallback = new EventEmitter();

  valueChanges$: Subject<string> = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.valueChanges$
      .pipe(
        startWith(''),
        filter((query) => {
          return query.length > 1;
        }),
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.onChangeCallback.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  searchOptions(searchTerm: string = '') {
    this.valueChanges$.next(searchTerm);
  }

  getErrorMessage() {
    const errorKey = Object.keys(
      this.formGroup.controls?.[this.name]?.errors || {}
    )[0];
    return (errorKey && this.errorConfig?.[errorKey]) || '';
  }
}
