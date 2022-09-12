import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ConditionActions, ConditionSelectors } from 'src/app/store/condition';
import { formConfig } from './upsert-condition.form-config';

@Component({
  selector: 'app-upsert-condition-modal',
  templateUrl: './upsert-condition-modal.component.html',
  styleUrls: ['./upsert-condition-modal.component.scss'],
})
export class UpsertConditionModalComponent implements OnInit {
  private readonly destroy$ = new Subject();

  form!: FormGroup;
  loading$!: Observable<boolean>;

  formConfig = formConfig;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populateForm();

    this.loading$ = this.store.select(
      ConditionSelectors.selectLoadingUpsertCondition as any
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private createForm(): void {
    const formBuilderConfig = Object.entries(this.formConfig).reduce(
      (acc, [key, val]) => {
        acc[key] = val.attributes;
        return acc;
      },
      {}
    );
    this.form = this.formBuilder.group(formBuilderConfig);
  }

  private populateForm(): void {
    if (!this.data.condition) {
      return;
    }
    const { id, displayName, ...formValues } = this.data.condition;
    this.form.setValue(formValues);
  }

  submitUpsertCondition() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const editMode = !!this.data.condition;
      if (editMode) {
        this.store.dispatch(
          ConditionActions.updateCondition({
            condition: {
              id: this.data.condition.id,
              ...this.form.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          ConditionActions.createCondition({
            condition: this.form.value,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(ConditionActions.closeUpsertCondition());
  }
}
