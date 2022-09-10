import { Injectable } from '@angular/core';
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
    private router: Router
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
            return of(OrganizationActions.loadOrganizationsFailure());
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
            return OrganizationActions.createOrganizationSuccess();
          }),
          catchError(() => {
            return of(OrganizationActions.createOrganizationFailure());
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
            });
          }),
          catchError(() => {
            return of(OrganizationActions.updateOrganizationFailure());
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
            });
          }),
          catchError(() => {
            return of(OrganizationActions.deleteOrganizationFailure());
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
                OrganizationActions.loadOrganizationByIdFromRouteFailure()
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
                OrganizationActions.loadOrganizationUsersByIdFromRouteFailure()
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
              });
            }),
            catchError(() => {
              return of(OrganizationActions.addNewUserToOrganizationFailure());
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
              });
            }),
            catchError(() => {
              return of(
                OrganizationActions.removeUserFromOrganizationFailure()
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
}
