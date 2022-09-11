import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, withLatestFrom } from 'rxjs';
import { AuthSelectors } from '../store/auth';

@Injectable()
export class DoctorOrNurseGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): boolean | Observable<boolean> {
    return this.store.select(AuthSelectors.selectUser as any).pipe(
      withLatestFrom(
        this.store.select(AuthSelectors.selectLoadingProfile as any),
        this.store.select(AuthSelectors.selectLoadingRefreshToken as any)
      ),
      filter(([, loadingProfile, loadingRefreshToken]) => {
        return !loadingProfile && !loadingRefreshToken;
      }),
      map(([user, ,]: any) => {
        console.log(user);
        return (
          user && (user.doctor || user.nurse) && !!user.selectedOrganizationId
        );
      })
    );
  }
}
