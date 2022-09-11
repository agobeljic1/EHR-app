import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { PatientActions, PatientSelectors } from 'src/app/store/patient';
import { formConfig } from './upsert-patient.form-config';

@Component({
  selector: 'app-upsert-patient-modal',
  templateUrl: './upsert-patient-modal.component.html',
  styleUrls: ['./upsert-patient-modal.component.scss'],
})
export class UpsertPatientModalComponent implements OnInit {
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
      PatientSelectors.selectLoadingUpsertPatient as any
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
    if (!this.data.patient) {
      return;
    }
    const { id, displayName, ...formValues } = this.data.patient;
    this.form.setValue(formValues);
  }

  submitUpsertPatient() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const editMode = !!this.data.patient;
      if (editMode) {
        this.store.dispatch(
          PatientActions.updatePatient({
            patient: {
              id: this.data.patient.id,
              ...this.form.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          PatientActions.createPatient({
            patient: this.form.value,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(PatientActions.closeUpsertPatient());
  }
}
