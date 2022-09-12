import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, withLatestFrom, map } from 'rxjs';
import { UpsertConditionModalComponent } from 'src/app/components/modals/upsert-condition-modal/upsert-condition-modal.component';
import { Condition } from 'src/app/models/condition/Condition';
import { ConditionActions, ConditionSelectors } from 'src/app/store/condition';

@Component({
  selector: 'app-conditions-page',
  templateUrl: './conditions-page.component.html',
  styleUrls: ['./conditions-page.component.scss'],
})
export class ConditionsPageComponent implements OnInit {
  private readonly destroy$ = new Subject();

  conditions$!: Observable<Condition>;
  loading$!: Observable<boolean>;
  activeDeleteConditionId$!: Observable<string | null>;
  upsertConditionData$!: Observable<Condition | null>;

  upsertConditionDialogRef!: MatDialogRef<UpsertConditionModalComponent> | null;
  displayedColumns: string[] = [
    'status',
    'severity',
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
    this.store.dispatch(ConditionActions.loadConditions());
    this.conditions$ = this.store.select(
      ConditionSelectors.selectAllConditions as any
    );
    this.loading$ = this.store.select(
      ConditionSelectors.selectLoadingConditions as any
    );

    this.activeDeleteConditionId$ = this.store.select(
      ConditionSelectors.selectActiveDeleteConditionId as any
    );

    this.upsertConditionData$ = this.store.select(
      ConditionSelectors.selectUpsertConditionData as any
    );

    this.store
      .select(ConditionSelectors.selectUpsertConditionOpen as any)
      .pipe(withLatestFrom(this.upsertConditionData$), takeUntil(this.destroy$))
      .subscribe(([upsertConditionOpen, condition]) => {
        if (upsertConditionOpen) {
          this.openUpsertConditionModal(condition);
        } else {
          this.closeUpsertConditionModal();
        }
      });
  }

  onCreateConditionClick = () => {
    this.store.dispatch(
      ConditionActions.openUpsertCondition({ condition: null })
    );
  };

  onUpdateConditionClick = (e, condition) => {
    e.stopPropagation();
    this.store.dispatch(ConditionActions.openUpsertCondition({ condition }));
  };

  onDeleteConditionClick = (e, condition) => {
    e.stopPropagation();
    this.store.dispatch(ConditionActions.deleteCondition({ condition }));
  };

  openUpsertConditionModal(condition: Condition | null): void {
    this.upsertConditionDialogRef = this.dialog.open(
      UpsertConditionModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          condition,
        },
      }
    );
  }

  closeUpsertConditionModal(): void {
    if (this.upsertConditionDialogRef) {
      this.upsertConditionDialogRef.close();
      this.upsertConditionDialogRef = null;
    }
  }
}
