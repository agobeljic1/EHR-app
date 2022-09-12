import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Encounter } from 'src/app/models/encounter/Encounter';
import { EncounterActions, EncounterSelectors } from 'src/app/store/encounter';
import { UpsertEncounterModalComponent } from '../../../modals/upsert-encounter-modal/upsert-encounter-modal.component';

@Component({
  selector: 'app-encounters-page',
  templateUrl: './encounters-page.component.html',
  styleUrls: ['./encounters-page.component.scss'],
})
export class EncountersPageComponent implements OnInit {
  private readonly destroy$ = new Subject();
  encounters$!: Observable<Encounter>;
  loading$!: Observable<boolean>;
  loadingDeleteEncounter$!: Observable<boolean>;
  displayedColumns: string[] = [
    'status',
    'priority',
    'start',
    'patient',
    'organization',
    'options',
  ];
  upsertEncounterDialogRef!: MatDialogRef<UpsertEncounterModalComponent> | null;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(EncounterActions.loadEncounters());
    this.encounters$ = this.store.select(
      EncounterSelectors.selectAllEncounters as any
    );
    this.loading$ = this.store.select(
      EncounterSelectors.selectLoadingEncounters as any
    );
    this.loadingDeleteEncounter$ = this.store.select(
      EncounterSelectors.selectLoadingDeleteEncounter as any
    );
    this.store
      .select(EncounterSelectors.selectUpsertEncounterOpen as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe((upsertEncounterOpen) => {
        if (upsertEncounterOpen) {
          this.openUpsertEncounterModal();
        } else {
          this.closeUpsertEncounterModal();
        }
      });
  }

  openUpsertEncounterModal(): void {
    this.upsertEncounterDialogRef = this.dialog.open(
      UpsertEncounterModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          encounter: null,
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

  onCreateEncounterClick = () => {
    this.store.dispatch(
      EncounterActions.openUpsertEncounter({ encounter: null })
    );
  };

  onUpdateEncounterClick = (encounter) => {
    this.store.dispatch(EncounterActions.openUpsertEncounter({ encounter }));
  };

  onShowEncounterDetails = (e, encounter) => {
    e.preventDefault();
    this.store.dispatch(EncounterActions.showEncounterDetails({ encounter }));
  };

  onDeleteEncounterClick = (e, encounter) => {
    e.stopPropagation();
    this.store.dispatch(EncounterActions.deleteEncounter({ encounter }));
  };
}
