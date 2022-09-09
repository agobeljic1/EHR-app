import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';
import { LoginModalComponent } from '../../modals/login-modal/login-modal.component';
import { ProfileModalComponent } from '../../modals/profile-modal/profile-modal.component';
import { RegisterModalComponent } from '../../modals/register-modal/register-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private readonly destroy$ = new Subject();

  sidenavOpen: boolean = false;

  loggedUser$!: Observable<any>;
  loading$!: Observable<boolean>;

  loginDialogRef!: MatDialogRef<LoginModalComponent> | null;
  profileDialogRef!: MatDialogRef<ProfileModalComponent> | null;
  registerDialogRef!: MatDialogRef<RegisterModalComponent> | null;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(AuthSelectors.selectUser as any);
    this.loading$ = this.store.select(
      AuthSelectors.selectLoadingProfile as any
    );

    this.store
      .select(AuthSelectors.selectLoginOpen as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe((loginOpen) => {
        if (loginOpen) {
          this.openLoginModal();
        } else {
          this.closeLoginModal();
        }
      });

    this.store
      .select(AuthSelectors.selectRegisterOpen as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe((registerOpen) => {
        if (registerOpen) {
          this.openRegisterModal();
        } else {
          this.closeRegisterModal();
        }
      });

    this.store
      .select(AuthSelectors.selectProfileOpen as any)
      .pipe(takeUntil(this.destroy$))
      .subscribe((profileOpen) => {
        if (profileOpen) {
          this.openProfileModal();
        } else {
          this.closeProfileModal();
        }
      });
  }

  onLoginClick = () => {
    this.store.dispatch(AuthActions.openLogin());
  };

  onProfileClick = () => {
    this.store.dispatch(AuthActions.openProfile());
  };

  onRegisterClick = () => {
    this.store.dispatch(AuthActions.openRegister());
  };

  openLoginModal(): void {
    this.loginDialogRef = this.dialog.open(LoginModalComponent, {
      width: '450px',
      disableClose: true,
      data: {},
    });
  }

  closeLoginModal(): void {
    if (this.loginDialogRef) {
      this.loginDialogRef.close();
      this.loginDialogRef = null;
    }
  }

  openRegisterModal(): void {
    this.registerDialogRef = this.dialog.open(RegisterModalComponent, {
      width: '450px',
      disableClose: true,
      data: {},
    });
  }

  closeRegisterModal(): void {
    if (this.registerDialogRef) {
      this.registerDialogRef.close();
      this.registerDialogRef = null;
    }
  }

  openProfileModal(): void {
    this.profileDialogRef = this.dialog.open(ProfileModalComponent, {
      width: '450px',
      data: {},
    });
  }

  closeProfileModal(): void {
    if (this.profileDialogRef) {
      this.profileDialogRef.close();
      this.profileDialogRef = null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
