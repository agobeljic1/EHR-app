import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';
import { OrganizationActions } from '.';

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions$: Actions,
    private organizationService: OrganizationService
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
            return OrganizationActions.updateOrganizationSuccess();
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
            return OrganizationActions.deleteOrganizationSuccess();
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
      ofType(
        OrganizationActions.createOrganizationSuccess,
        OrganizationActions.updateOrganizationSuccess,
        OrganizationActions.deleteOrganizationSuccess
      ),
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
}
