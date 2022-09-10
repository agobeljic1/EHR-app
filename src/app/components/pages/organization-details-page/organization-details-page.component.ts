import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { Organization } from 'src/app/models/organization/Organization';
import { User } from 'src/app/models/user/User';
import {
  OrganizationActions,
  OrganizationSelectors,
} from 'src/app/store/organization';
import { AddUserToOrganizationModalComponent } from '../../modals/add-user-to-organization-modal/add-user-to-organization-modal.component';
import { UpsertOrganizationModalComponent } from '../../modals/upsert-organization-modal/upsert-organization-modal.component';

@Component({
  selector: 'app-organization-details-page',
  templateUrl: './organization-details-page.component.html',
  styleUrls: ['./organization-details-page.component.scss'],
})
export class OrganizationDetailsPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  displayedUserColumns: string[] = [
    'emailAddress',
    'name',
    'birthDate',
    'gender',
    'role',
    'options',
  ];

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  organization$!: Observable<Organization>;
  organizationUsers$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  loadingUsers$!: Observable<boolean>;
  upsertOrganizationData$!: Observable<Organization | null>;
  addUserToOrganizationData$!: Observable<Organization | null>;
  loadingDeleteOrganization$!: Observable<boolean>;

  selectActiveRemovingUserIdFromOrganization$!: Observable<string | null>;

  upsertOrganizationDialogRef!: MatDialogRef<UpsertOrganizationModalComponent> | null;
  addUserToOrganizationDialogRef!: MatDialogRef<AddUserToOrganizationModalComponent> | null;

  ngOnInit(): void {
    const organizationId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(
      OrganizationActions.loadOrganizationByIdFromRoute({
        organizationId,
      })
    );

    this.store.dispatch(
      OrganizationActions.loadOrganizationUsersByIdFromRoute({
        organizationId,
      })
    );

    this.organization$ = this.store.select(
      OrganizationSelectors.selectOrganizationById as any
    );

    this.organizationUsers$ = this.store.select(
      OrganizationSelectors.selectOrganizationUsersById as any
    );

    this.loading$ = this.store.select(
      OrganizationSelectors.selectLoadingOrganizationById as any
    );

    this.loadingUsers$ = this.store.select(
      OrganizationSelectors.selectLoadingOrganizationUsersById as any
    );

    this.upsertOrganizationData$ = this.store.select(
      OrganizationSelectors.selectUpsertOrganizationData as any
    );

    this.addUserToOrganizationData$ = this.store.select(
      OrganizationSelectors.selectAddUserToOrganizationData as any
    );

    this.loadingDeleteOrganization$ = this.store.select(
      OrganizationSelectors.selectLoadingDeleteOrganization as any
    );

    this.selectActiveRemovingUserIdFromOrganization$ = this.store.select(
      OrganizationSelectors.selectActiveRemovingUserIdFromOrganization as any
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

    this.store
      .select(OrganizationSelectors.selectAddUserToOrganizationOpen as any)
      .pipe(
        withLatestFrom(this.addUserToOrganizationData$),
        takeUntil(this.destroy$)
      )
      .subscribe(([upsertOrganizationOpen, organization]) => {
        if (upsertOrganizationOpen) {
          this.openAddUserToOrganizationModal(organization);
        } else {
          this.closeAddUserToOrganizationModal();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onDeleteOrganizationClick = (organization) => {
    this.store.dispatch(
      OrganizationActions.deleteOrganization({ organization })
    );
  };

  onUpdateOrganizationClick = (organization) => {
    this.store.dispatch(
      OrganizationActions.openUpsertOrganization({ organization })
    );
  };

  onAddUserToOrganizationClick = (organization) => {
    this.store.dispatch(
      OrganizationActions.openAddUserToOrganization({ organization })
    );
  };

  onRemoveUserFromOrganizationClick = (organization, user) => {
    this.store.dispatch(
      OrganizationActions.removeUserFromOrganization({ organization, user })
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

  openAddUserToOrganizationModal(organization: Organization | null): void {
    this.addUserToOrganizationDialogRef = this.dialog.open(
      AddUserToOrganizationModalComponent,
      {
        width: '450px',
        minHeight: '600px',
        disableClose: true,
        data: {
          organization,
        },
      }
    );
  }

  closeAddUserToOrganizationModal(): void {
    if (this.addUserToOrganizationDialogRef) {
      this.addUserToOrganizationDialogRef.close();
      this.addUserToOrganizationDialogRef = null;
    }
  }
}
