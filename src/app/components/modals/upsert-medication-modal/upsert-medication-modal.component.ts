import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  MedicationActions,
  MedicationSelectors,
} from '../../../../app/store/medication';
import { formConfig } from './upsert-medication.form-config';

@Component({
  selector: 'app-upsert-medication-modal',
  templateUrl: './upsert-medication-modal.component.html',
  styleUrls: ['./upsert-medication-modal.component.scss'],
})
export class UpsertMedicationModalComponent implements OnInit {
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
      MedicationSelectors.selectLoadingUpsertMedication as any
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
    if (!this.data.medication) {
      return;
    }
    const {
      id,
      displayName,
      recordedDate,
      recorder,
      encounterId,
      userGiven,
      userFamily,
      ...formValues
    } = this.data.medication;
    this.form.setValue(formValues);
  }

  submitUpsertMedication() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const editMode = !!this.data.medication;
      if (editMode) {
        this.store.dispatch(
          MedicationActions.updateMedication({
            medication: {
              id: this.data.medication.id,
              ...this.form.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          MedicationActions.createMedication({
            medication: this.form.value,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(MedicationActions.closeUpsertMedication());
  }
}
