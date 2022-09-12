import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EncounterActions, EncounterSelectors } from 'src/app/store/encounter';

@Component({
  selector: 'app-encounter-details-page',
  templateUrl: './encounter-details-page.component.html',
  styleUrls: ['./encounter-details-page.component.scss'],
})
export class EncounterDetailsPageComponent implements OnInit {
  encounterId$!: Observable<string | null>;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const encounterId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(EncounterActions.setEncounterId({ encounterId }));

    this.encounterId$ = this.store.select(
      EncounterSelectors.selectEncounterId as any
    );
  }
}
