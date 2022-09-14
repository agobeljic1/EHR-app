import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { UpsertEncounterModalComponent } from 'src/app/components/modals/upsert-encounter-modal/upsert-encounter-modal.component';
import { Encounter } from 'src/app/models/encounter/Encounter';
import { EncounterActions, EncounterSelectors } from 'src/app/store/encounter';

@Component({
  selector: 'app-encounter-details-page',
  templateUrl: './encounter-details-page.component.html',
  styleUrls: ['./encounter-details-page.component.scss'],
})
export class EncounterDetailsPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  encounterId$!: Observable<string | null>;
  encounter$!: Observable<Encounter | null>;

  loadingEncounterById$!: Observable<boolean>;
  loadingDischargePatient$!: Observable<boolean>;

  upsertEncounterData$!: Observable<Encounter | null>;

  upsertEncounterDialogRef!: MatDialogRef<UpsertEncounterModalComponent> | null;

  loadingDeleteEncounter$!: Observable<boolean>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const encounterId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(EncounterActions.setEncounterId({ encounterId }));

    this.store.dispatch(
      EncounterActions.loadEncounterByIdFromRoute({ encounterId })
    );

    this.encounter$ = this.store.select(
      EncounterSelectors.selectEncounterById as any
    );

    this.encounterId$ = this.store.select(
      EncounterSelectors.selectEncounterId as any
    );

    this.upsertEncounterData$ = this.store.select(
      EncounterSelectors.selectUpsertEncounterData as any
    );

    this.loadingEncounterById$ = this.store.select(
      EncounterSelectors.selectLoadingEncounterById as any
    );

    this.loadingDeleteEncounter$ = this.store.select(
      EncounterSelectors.selectLoadingDeleteEncounter as any
    );

    this.loadingDischargePatient$ = this.store.select(
      EncounterSelectors.selectLoadingDischargePatient as any
    );

    this.store
      .select(EncounterSelectors.selectUpsertEncounterOpen as any)
      .pipe(withLatestFrom(this.upsertEncounterData$), takeUntil(this.destroy$))
      .subscribe(([upsertEncounterOpen, encounter]) => {
        if (upsertEncounterOpen) {
          this.openUpsertEncounterModal(encounter);
        } else {
          this.closeUpsertEncounterModal();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onDischargePatientClick(encounter) {
    this.store.dispatch(EncounterActions.dischargePatient({ encounter }));
  }

  onUpdateEncounterClick = (encounter) => {
    this.store.dispatch(EncounterActions.openUpsertEncounter({ encounter }));
  };

  onDeleteEncounterClick = (encounter) => {
    this.store.dispatch(EncounterActions.deleteEncounter({ encounter }));
  };

  openUpsertEncounterModal(encounter: Encounter | null): void {
    this.upsertEncounterDialogRef = this.dialog.open(
      UpsertEncounterModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          encounter,
        },
      }
    );
  }

  closeUpsertEncounterModal(): void {
    if (this.upsertEncounterDialogRef) {
      this.upsertEncounterDialogRef.close();
      this.upsertEncounterDialogRef = null;
    }
  }
}
