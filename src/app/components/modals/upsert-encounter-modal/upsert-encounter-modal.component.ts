import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { EncounterActions, EncounterSelectors } from 'src/app/store/encounter';
import { formConfig } from './upsert-encounter.form-config';

@Component({
  selector: 'app-upsert-encounter-modal',
  templateUrl: './upsert-encounter-modal.component.html',
  styleUrls: ['./upsert-encounter-modal.component.scss'],
})
export class UpsertEncounterModalComponent implements OnInit {
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
      EncounterSelectors.selectLoadingUpsertEncounter as any
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
    if (!this.data.encounter) {
      return;
    }
    const { id, ...formValues } = this.data.encounter;
    this.form.setValue(formValues);
  }

  submitUpsertEncounter() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const editMode = !!this.data.encounter;
      if (editMode) {
        this.store.dispatch(
          EncounterActions.updateEncounter({
            encounter: {
              id: this.data.encounter.id,
              ...this.form.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          EncounterActions.createEncounter({
            encounter: this.form.value,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(EncounterActions.closeUpsertEncounter());
  }
}
