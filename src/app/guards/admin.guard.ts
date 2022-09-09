import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, withLatestFrom } from 'rxjs';
import { AuthActions, AuthSelectors } from '../store/auth';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.store.select(AuthSelectors.selectUser as any).pipe(
      withLatestFrom(
        this.store.select(AuthSelectors.selectLoadingProfile as any),
        this.store.select(AuthSelectors.selectLoadingRefreshToken as any)
      ),
      filter(([, loadingProfile, loadingRefreshToken]) => {
        return !loadingProfile && !loadingRefreshToken;
      }),
      map(([user, ,]: any) => {
        return user && user.role === 'ADMIN';
      })
    );
  }
}
