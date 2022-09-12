import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, withLatestFrom, map } from 'rxjs';
import { UpsertAllergyModalComponent } from 'src/app/components/modals/upsert-allergy-modal/upsert-allergy-modal.component';
import { Allergy } from 'src/app/models/allergy/Allergy';
import {
  AllergyActions,
  AllergySelectors,
} from '../../../../../../app/store/allergy';

@Component({
  selector: 'app-allergys-page',
  templateUrl: './allergys-page.component.html',
  styleUrls: ['./allergys-page.component.scss'],
})
export class AllergysPageComponent implements OnInit {
  private readonly destroy$ = new Subject();

  allergys$!: Observable<Allergy>;
  loading$!: Observable<boolean>;
  activeDeleteAllergyId$!: Observable<string | null>;
  upsertAllergyData$!: Observable<Allergy | null>;

  upsertAllergyDialogRef!: MatDialogRef<UpsertAllergyModalComponent> | null;
  displayedColumns: string[] = [
    'onsetDateTime',
    'category',
    'criticality',
    'clinicalStatus',
    'recordedDate',
    'recorder',
    'options',
  ];

  constructor(
    private store: Store,
    private readonly dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AllergyActions.loadAllergys());
    this.allergys$ = this.store.select(
      AllergySelectors.selectAllAllergys as any
    );
    this.loading$ = this.store.select(
      AllergySelectors.selectLoadingAllergys as any
    );

    this.activeDeleteAllergyId$ = this.store.select(
      AllergySelectors.selectActiveDeleteAllergyId as any
    );

    this.upsertAllergyData$ = this.store.select(
      AllergySelectors.selectUpsertAllergyData as any
    );

    this.store
      .select(AllergySelectors.selectUpsertAllergyOpen as any)
      .pipe(withLatestFrom(this.upsertAllergyData$), takeUntil(this.destroy$))
      .subscribe(([upsertAllergyOpen, allergy]) => {
        if (upsertAllergyOpen) {
          this.openUpsertAllergyModal(allergy);
        } else {
          this.closeUpsertAllergyModal();
        }
      });
  }

  onCreateAllergyClick = () => {
    this.store.dispatch(AllergyActions.openUpsertAllergy({ allergy: null }));
  };

  onUpdateAllergyClick = (e, allergy) => {
    e.stopPropagation();
    this.store.dispatch(AllergyActions.openUpsertAllergy({ allergy }));
  };

  onDeleteAllergyClick = (e, allergy) => {
    e.stopPropagation();
    this.store.dispatch(AllergyActions.deleteAllergy({ allergy }));
  };

  openUpsertAllergyModal(allergy: Allergy | null): void {
    this.upsertAllergyDialogRef = this.dialog.open(
      UpsertAllergyModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          allergy,
        },
      }
    );
  }

  closeUpsertAllergyModal(): void {
    if (this.upsertAllergyDialogRef) {
      this.upsertAllergyDialogRef.close();
      this.upsertAllergyDialogRef = null;
    }
  }
}
