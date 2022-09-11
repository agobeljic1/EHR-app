import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, withLatestFrom, map } from 'rxjs';
import { Patient } from 'src/app/models/patient/Patient';
import { PatientActions, PatientSelectors } from 'src/app/store/patient';
import { UpsertPatientModalComponent } from '../../modals/upsert-patient-modal/upsert-patient-modal.component';

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.scss'],
})
export class PatientsPageComponent implements OnInit {
  private readonly destroy$ = new Subject();

  patients$!: Observable<Patient>;
  loading$!: Observable<boolean>;
  activeDeletePatientId$!: Observable<string | null>;
  upsertPatientData$!: Observable<Patient | null>;

  upsertPatientDialogRef!: MatDialogRef<UpsertPatientModalComponent> | null;
  displayedColumns: string[] = ['name', 'birthDate', 'gender', 'options'];

  constructor(private store: Store, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(PatientActions.loadPatients());
    this.patients$ = this.store.select(
      PatientSelectors.selectAllPatients as any
    );
    this.loading$ = this.store.select(
      PatientSelectors.selectLoadingPatients as any
    );

    this.activeDeletePatientId$ = this.store.select(
      PatientSelectors.selectActiveDeletePatientId as any
    );

    this.upsertPatientData$ = this.store.select(
      PatientSelectors.selectUpsertPatientData as any
    );

    this.store
      .select(PatientSelectors.selectUpsertPatientOpen as any)
      .pipe(withLatestFrom(this.upsertPatientData$), takeUntil(this.destroy$))
      .subscribe(([upsertPatientOpen, patient]) => {
        if (upsertPatientOpen) {
          this.openUpsertPatientModal(patient);
        } else {
          this.closeUpsertPatientModal();
        }
      });
  }

  onCreatePatientClick = () => {
    this.store.dispatch(PatientActions.openUpsertPatient({ patient: null }));
  };

  onUpdatePatientClick = (e, patient) => {
    e.stopPropagation();
    this.store.dispatch(PatientActions.openUpsertPatient({ patient }));
  };

  onDeletePatientClick = (e, patient) => {
    e.stopPropagation();
    this.store.dispatch(PatientActions.deletePatient({ patient }));
  };

  openUpsertPatientModal(patient: Patient | null): void {
    this.upsertPatientDialogRef = this.dialog.open(
      UpsertPatientModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          patient,
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
