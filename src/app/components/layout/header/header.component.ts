import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sidenavOpen: boolean = false;
  loginOpen$!: Observable<boolean>;
  registerOpen$!: Observable<boolean>;
  profileOpen$!: Observable<boolean>;

  loggedUser$!: Observable<any>;
  loading$!: Observable<boolean>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(AuthSelectors.selectUser as any);
    this.loading$ = this.store.select(
      AuthSelectors.selectLoadingProfile as any
    );
    this.loginOpen$ = this.store.select(AuthSelectors.selectLoginOpen as any);
    this.registerOpen$ = this.store.select(
      AuthSelectors.selectRegisterOpen as any
    );
    this.profileOpen$ = this.store.select(
      AuthSelectors.selectProfileOpen as any
    );
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  openLogin() {
    this.store.dispatch(AuthActions.openLogin());
  }

  closeLogin() {
    this.store.dispatch(AuthActions.closeLogin());
  }

  openRegister() {
    this.store.dispatch(AuthActions.openRegister());
  }

  closeRegister() {
    this.store.dispatch(AuthActions.closeRegister());
  }

  openProfile() {
    this.store.dispatch(AuthActions.openProfile());
  }

  closeProfile() {
    this.store.dispatch(AuthActions.closeProfile());
  }
}
