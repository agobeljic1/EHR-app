import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { Organization } from 'src/app/models/organization/Organization';
import {
  OrganizationActions,
  OrganizationSelectors,
} from 'src/app/store/organization';
import { UpsertOrganizationModalComponent } from '../../modals/upsert-organization-modal/upsert-organization-modal.component';

@Component({
  selector: 'app-organizations-page',
  templateUrl: './organizations-page.component.html',
  styleUrls: ['./organizations-page.component.scss'],
})
export class OrganizationsPageComponent implements OnInit {
  private readonly destroy$ = new Subject();

  organizations$!: Observable<Organization>;
  loading$!: Observable<boolean>;
  activeDeleteOrganizationId$!: Observable<string | null>;
  upsertOrganizationData$!: Observable<Organization | null>;

  upsertOrganizationDialogRef!: MatDialogRef<UpsertOrganizationModalComponent> | null;

  displayedColumns: string[] = ['name', 'line', 'city', 'country', 'options'];

  constructor(private store: Store, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(OrganizationActions.loadOrganizations());
    this.organizations$ = this.store.select(
      OrganizationSelectors.selectAllOrganizations as any
    );
    this.loading$ = this.store.select(
      OrganizationSelectors.selectLoadingOrganizations as any
    );

    this.activeDeleteOrganizationId$ = this.store.select(
      OrganizationSelectors.selectActiveDeleteOrganizationId as any
    );

    this.upsertOrganizationData$ = this.store.select(
      OrganizationSelectors.selectUpsertOrganizationData as any
    );

    this.store
      .select(OrganizationSelectors.selectUpsertOrganizationOpen as any)
      .pipe(
        withLatestFrom(this.upsertOrganizationData$),
        takeUntil(this.destroy$)
      )
      .subscribe(([upsertOrganizationOpen, organization]) => {
        if (upsertOrganizationOpen) {
          this.openUpsertOrganizationModal(organization);
        } else {
          this.closeUpsertOrganizationModal();
        }
      });
  }

  onCreateOrganizationClick = () => {
    this.store.dispatch(
      OrganizationActions.openUpsertOrganization({ organization: null })
    );
  };

  onUpdateOrganizationClick = (organization) => {
    this.store.dispatch(
      OrganizationActions.openUpsertOrganization({ organization })
    );
  };

  onDeleteOrganizationClick = (e, organization) => {
    e.stopPropagation();
    this.store.dispatch(
      OrganizationActions.deleteOrganization({ organization })
    );
  };

  openUpsertOrganizationModal(organization: Organization | null): void {
    this.upsertOrganizationDialogRef = this.dialog.open(
      UpsertOrganizationModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          organization,
        },
      }
    );
  }

  closeUpsertOrganizationModal(): void {
    if (this.upsertOrganizationDialogRef) {
      this.upsertOrganizationDialogRef.close();
      this.upsertOrganizationDialogRef = null;
    }
  }
}
