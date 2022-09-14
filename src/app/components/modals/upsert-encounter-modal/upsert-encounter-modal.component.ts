import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap, withLatestFrom } from 'rxjs';
import { Patient } from 'src/app/models/patient/Patient';
import { EncounterActions, EncounterSelectors } from 'src/app/store/encounter';
import { PatientActions, PatientSelectors } from 'src/app/store/patient';
import { UpsertPatientModalComponent } from '../upsert-patient-modal/upsert-patient-modal.component';
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

  loadingPatients$!: Observable<boolean>;
  patients$!: Observable<any[]>;
  selectedPatient$!: Observable<Patient>;
  upsertPatientDialogRef!: MatDialogRef<UpsertPatientModalComponent> | null;

  formConfig = formConfig;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populateForm();

    this.loading$ = this.store.select(
      EncounterSelectors.selectLoadingUpsertEncounter as any
    );

    this.loadingPatients$ = this.store.select(
      PatientSelectors.selectLoadingSearchPatientsByQuery as any
    );

    this.selectedPatient$ = this.store.select(
      EncounterSelectors.selectedPatientForEncounter as any
    );

    this.patients$ = this.store
      .select(PatientSelectors.selectFoundPatientsByQuery as any)
      .pipe(
        tap((a: any) => {
          console.log(a);
          return a as any;
        })
      );

    this.store
      .select(PatientSelectors.selectUpsertPatientOpen as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe((upsertPatientOpen) => {
        if (upsertPatientOpen) {
          this.openUpsertPatientModal();
        } else {
          this.closeUpsertPatientModal();
        }
      });
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
    const { status, priority, periodStart, periodEnd } = this.data.encounter;
    console.log(this.data.encounter);
    this.form.setValue({
      status,
      priority,
      periodStart,
      periodEnd,
      patient: {},
    });
  }

  submitUpsertEncounter(selectedPatient) {
    this.form.markAllAsTouched();
    if ((this.data.encounter || selectedPatient) && this.form.valid) {
      const { patient, ...encounterValues } = this.form.value;
      const encounter = {
        ...encounterValues,
        patientId: this.data.encounter?.patientId || selectedPatient.id,
      };
      const editMode = !!this.data.encounter;
      if (editMode) {
        this.store.dispatch(
          EncounterActions.updateEncounter({
            encounter: {
              id: this.data.encounter.id,
              ...encounter,
            },
          })
        );
      } else {
        this.store.dispatch(
          EncounterActions.createEncounter({
            encounter,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(EncounterActions.closeUpsertEncounter());
  }

  searchPatients(query: string) {
    this.store.dispatch(PatientActions.searchPatientsByQuery({ query }));
  }

  selectPatient(patient: Patient) {
    this.store.dispatch(EncounterActions.setPatientForEncounter({ patient }));
  }

  onCreateNewPatientForEncounterClick() {
    this.store.dispatch(PatientActions.openUpsertPatient({ patient: null }));
  }

  openUpsertPatientModal() {
    this.upsertPatientDialogRef = this.dialog.open(
      UpsertPatientModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          patient: null,
        },
      }
    );
  }

  closeUpsertPatientModal(): void {
    if (this.upsertPatientDialogRef) {
      this.upsertPatientDialogRef.close();
      this.upsertPatientDialogRef = null;
    }
  }
}
