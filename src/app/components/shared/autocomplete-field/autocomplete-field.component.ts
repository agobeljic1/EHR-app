import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, filter, Observable, startWith, Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss'],
})
export class AutocompleteFieldComponent implements OnInit {
  @Input() name!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() loading!: boolean | null;
  @Input() options!: any[] | null;

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
        debounceTime(300)
      )
      .subscribe((value) => {
        this.onChangeCallback.emit(value);
      });
  }

  searchOptions(searchTerm: string = '') {
    this.valueChanges$.next(searchTerm);
  }
}
