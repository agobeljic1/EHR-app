import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, withLatestFrom, map } from 'rxjs';
import { UpsertMedicationModalComponent } from 'src/app/components/modals/upsert-medication-modal/upsert-medication-modal.component';
import { Medication } from 'src/app/models/medication/Medication';
import {
  MedicationActions,
  MedicationSelectors,
} from '../../../../../../app/store/medication';

@Component({
  selector: 'app-medications-page',
  templateUrl: './medications-page.component.html',
  styleUrls: ['./medications-page.component.scss'],
})
export class MedicationsPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  medications$!: Observable<Medication>;
  loading$!: Observable<boolean>;
  activeDeleteMedicationId$!: Observable<string | null>;
  upsertMedicationData$!: Observable<Medication | null>;

  upsertMedicationDialogRef!: MatDialogRef<UpsertMedicationModalComponent> | null;
  displayedColumns: string[] = ['code', 'status', 'amount', 'form', 'options'];

  constructor(
    private store: Store,
    private readonly dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MedicationActions.loadMedications());
    this.medications$ = this.store.select(
      MedicationSelectors.selectAllMedications as any
    );
    this.loading$ = this.store.select(
      MedicationSelectors.selectLoadingMedications as any
    );

    this.activeDeleteMedicationId$ = this.store.select(
      MedicationSelectors.selectActiveDeleteMedicationId as any
    );

    this.upsertMedicationData$ = this.store.select(
      MedicationSelectors.selectUpsertMedicationData as any
    );

    this.store
      .select(MedicationSelectors.selectUpsertMedicationOpen as any)
      .pipe(
        withLatestFrom(this.upsertMedicationData$),
        takeUntil(this.destroy$)
      )
      .subscribe(([upsertMedicationOpen, medication]) => {
        if (upsertMedicationOpen) {
          this.openUpsertMedicationModal(medication);
        } else {
          this.closeUpsertMedicationModal();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onCreateMedicationClick = () => {
    this.store.dispatch(
      MedicationActions.openUpsertMedication({ medication: null })
    );
  };

  onUpdateMedicationClick = (e, medication) => {
    e.stopPropagation();
    this.store.dispatch(MedicationActions.openUpsertMedication({ medication }));
  };

  onDeleteMedicationClick = (e, medication) => {
    e.stopPropagation();
    this.store.dispatch(MedicationActions.deleteMedication({ medication }));
  };

  openUpsertMedicationModal(medication: Medication | null): void {
    this.upsertMedicationDialogRef = this.dialog.open(
      UpsertMedicationModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          medication,
        },
      }
    );
  }

  closeUpsertMedicationModal(): void {
    if (this.upsertMedicationDialogRef) {
      this.upsertMedicationDialogRef.close();
      this.upsertMedicationDialogRef = null;
    }
  }
}
