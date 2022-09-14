import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap, first, filter } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationActions } from '.';

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions$: Actions,
    private organizationService: OrganizationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  organizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.loadOrganizations),
      switchMap(() => {
        return this.organizationService.getOrganizations().pipe(
          map(({ organizations }: any) => {
            return OrganizationActions.loadOrganizationsSuccess({
              organizations,
            });
          }),
          catchError(() => {
            return of(
              OrganizationActions.loadOrganizationsFailure({
                message: 'Failed to load organizations',
              })
            );
          })
        );
      })
    )
  );

  createOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.createOrganization),
      switchMap(({ organization }) => {
        return this.organizationService.createOrganization(organization).pipe(
          map(() => {
            return OrganizationActions.createOrganizationSuccess({
              message: 'Successfully created organization',
            });
          }),
          catchError(() => {
            return of(
              OrganizationActions.createOrganizationFailure({
                message: 'Failed to create organization',
              })
            );
          })
        );
      })
    )
  );

  updateOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.updateOrganization),
      switchMap(({ organization }) => {
        return this.organizationService.updateOrganization(organization).pipe(
          map(() => {
            return OrganizationActions.updateOrganizationSuccess({
              organizationId: organization.id,
              message: 'Successfully updated organization',
            });
          }),
          catchError(() => {
            return of(
              OrganizationActions.updateOrganizationFailure({
                message: 'Failed to update organization',
              })
            );
          })
        );
      })
    )
  );

  deleteOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.deleteOrganization),
      switchMap(({ organization }) => {
        return this.organizationService.deleteOrganization(organization).pipe(
          map(() => {
            return OrganizationActions.deleteOrganizationSuccess({
              organizationId: organization.id,
              message: 'Successfully deleted organization',
            });
          }),
          catchError(() => {
            return of(
              OrganizationActions.deleteOrganizationFailure({
                message: 'Failed to delete organization',
              })
            );
          })
        );
      })
    )
  );

  refetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.createOrganizationSuccess),
      map(() => {
        return OrganizationActions.loadOrganizations();
      })
    )
  );

  closeUpsertOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OrganizationActions.createOrganizationSuccess,
        OrganizationActions.updateOrganizationSuccess
      ),
      map(() => {
        return OrganizationActions.closeUpsertOrganization();
      })
    )
  );

  showOrganizationDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.showOrganizationDetails),
      tap(({ organization }) =>
        this.router.navigate(['organizations', organization.id])
      ),
      map(() => {
        return OrganizationActions.showOrganizationDetailsSuccess();
      })
    )
  );

  showOrganizations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.deleteOrganizationSuccess),
      tap(() => this.router.navigate(['organizations'])),
      map(() => {
        return OrganizationActions.showOrganizationsSuccess();
      })
    )
  );

  loadOrganizationById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.loadOrganizationByIdFromRoute),
      switchMap(({ organizationId }) => {
        return this.organizationService
          .getOrganizationById(organizationId)
          .pipe(
            map(({ organization }: any) => {
              return OrganizationActions.loadOrganizationByIdFromRouteSuccess({
                organization,
              });
            }),
            catchError(() => {
              return of(
                OrganizationActions.loadOrganizationByIdFromRouteFailure({
                  message: 'Failed to load organization',
                })
              );
            })
          );
      })
    )
  );

  loadOrganizationUsersById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.loadOrganizationUsersByIdFromRoute),
      switchMap(({ organizationId }) => {
        return this.organizationService
          .getOrganizationUsersById(organizationId)
          .pipe(
            map(({ users }: any) => {
              return OrganizationActions.loadOrganizationUsersByIdFromRouteSuccess(
                {
                  users,
                  organizationId,
                }
              );
            }),
            catchError(() => {
              return of(
                OrganizationActions.loadOrganizationUsersByIdFromRouteFailure({
                  message: 'Failed to load organization users',
                })
              );
            })
          );
      })
    )
  );

  addUserToOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.addNewUserToOrganization),
      switchMap(({ organization, user }) => {
        return this.organizationService
          .addNewUserToOrganization(organization, user)
          .pipe(
            map(() => {
              return OrganizationActions.addNewUserToOrganizationSuccess({
                organizationId: organization.id,
                message: 'Successfully added user to organization',
              });
            }),
            catchError(() => {
              return of(
                OrganizationActions.addNewUserToOrganizationFailure({
                  message: 'Failed to add user to organization',
                })
              );
            })
          );
      })
    )
  );

  closeAddUserToOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.addNewUserToOrganizationSuccess),
      map(() => {
        return OrganizationActions.closeAddUserToOrganization();
      })
    )
  );

  removeUserFromOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.removeUserFromOrganization),
      switchMap(({ organization, user }) => {
        return this.organizationService
          .removeUserFromOrganization(organization, user)
          .pipe(
            map(() => {
              return OrganizationActions.removeUserFromOrganizationSuccess({
                organizationId: organization.id,
                message: 'Successfully removed user from organization',
              });
            }),
            catchError(() => {
              return of(
                OrganizationActions.removeUserFromOrganizationFailure({
                  message: 'Failed to remove user from organization',
                })
              );
            })
          );
      })
    )
  );

  refetchOrganizationUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OrganizationActions.removeUserFromOrganizationSuccess,
        OrganizationActions.addNewUserToOrganizationSuccess
      ),
      map(({ organizationId }) => {
        return OrganizationActions.loadOrganizationUsersByIdFromRoute({
          organizationId,
        });
      })
    )
  );

  refetchOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizationActions.updateOrganizationSuccess),
      map(({ organizationId }) => {
        return OrganizationActions.loadOrganizationByIdFromRoute({
          organizationId,
        });
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OrganizationActions.loadOrganizationsFailure,
        OrganizationActions.createOrganizationSuccess,
        OrganizationActions.createOrganizationFailure,
        OrganizationActions.updateOrganizationSuccess,
        OrganizationActions.updateOrganizationFailure,
        OrganizationActions.deleteOrganizationSuccess,
        OrganizationActions.deleteOrganizationFailure,
        OrganizationActions.loadOrganizationByIdFromRouteFailure,
        OrganizationActions.loadOrganizationUsersByIdFromRouteFailure,
        OrganizationActions.addNewUserToOrganizationSuccess,
        OrganizationActions.addNewUserToOrganizationFailure,
        OrganizationActions.removeUserFromOrganizationSuccess,
        OrganizationActions.removeUserFromOrganizationFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => OrganizationActions.showMessageSuccess())
    )
  );
}
