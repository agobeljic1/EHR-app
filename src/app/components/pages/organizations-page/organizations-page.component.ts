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
  loadingDeleteOrganization$!: Observable<boolean>;

  displayedColumns: string[] = ['name', 'line', 'city', 'country', 'options'];

  upsertOrganizationDialogRef!: MatDialogRef<UpsertOrganizationModalComponent> | null;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(OrganizationActions.loadOrganizations());
    this.organizations$ = this.store.select(
      OrganizationSelectors.selectAllOrganizations as any
    );
    this.loading$ = this.store.select(
      OrganizationSelectors.selectLoadingOrganizations as any
    );

    this.loadingDeleteOrganization$ = this.store.select(
      OrganizationSelectors.selectLoadingDeleteOrganization as any
    );

    this.store
      .select(OrganizationSelectors.selectUpsertOrganizationOpen as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe((upsertOrganizationOpen) => {
        if (upsertOrganizationOpen) {
          this.openUpsertOrganizationModal();
        } else {
          this.closeUpsertOrganizationModal();
        }
      });
  }

  openUpsertOrganizationModal(): void {
    this.upsertOrganizationDialogRef = this.dialog.open(
      UpsertOrganizationModalComponent,
      {
        width: '450px',
        disableClose: true,
        data: {
          organization: null,
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

  onShowOrganizationDetails = (e, organization) => {
    e.preventDefault();
    this.store.dispatch(
      OrganizationActions.showOrganizationDetails({ organization })
    );
  };

  onDeleteOrganizationClick = (e, organization) => {
    e.stopPropagation();
    this.store.dispatch(
      OrganizationActions.deleteOrganization({ organization })
    );
  };
}
