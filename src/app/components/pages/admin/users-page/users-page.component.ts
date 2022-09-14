import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, withLatestFrom, map } from 'rxjs';
import { User } from 'src/app/models/user/User';
import { UserActions, UserSelectors } from 'src/app/store/user';
import { AuthSelectors } from 'src/app/store/auth';
import { UpsertUserModalComponent } from '../../../modals/upsert-user-modal/upsert-user-modal.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
})
export class UsersPageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  users$!: Observable<User>;
  loading$!: Observable<boolean>;
  activeDeleteUserId$!: Observable<string | null>;
  upsertUserData$!: Observable<User | null>;

  loggedUser$!: Observable<any>;

  upsertUserDialogRef!: MatDialogRef<UpsertUserModalComponent> | null;
  displayedColumns: string[] = [
    'emailAddress',
    'name',
    'birthDate',
    'gender',
    'role',
    'options',
  ];

  constructor(private store: Store, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.users$ = this.store.select(UserSelectors.selectAllUsers as any);
    this.loading$ = this.store.select(UserSelectors.selectLoadingUsers as any);

    this.loggedUser$ = this.store.select(AuthSelectors.selectUser as any);

    this.activeDeleteUserId$ = this.store.select(
      UserSelectors.selectActiveDeleteUserId as any
    );

    this.upsertUserData$ = this.store.select(
      UserSelectors.selectUpsertUserData as any
    );

    this.store
      .select(UserSelectors.selectUpsertUserOpen as any)
      .pipe(withLatestFrom(this.upsertUserData$), takeUntil(this.destroy$))
      .subscribe(([upsertUserOpen, user]) => {
        if (upsertUserOpen) {
          this.openUpsertUserModal(user);
        } else {
          this.closeUpsertUserModal();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onCreateUserClick = () => {
    this.store.dispatch(UserActions.openUpsertUser({ user: null }));
  };

  onUpdateUserClick = (e, user) => {
    e.stopPropagation();
    this.store.dispatch(UserActions.openUpsertUser({ user }));
  };

  onDeleteUserClick = (e, user) => {
    e.stopPropagation();
    this.store.dispatch(UserActions.deleteUser({ user }));
  };

  openUpsertUserModal(user: User | null): void {
    this.upsertUserDialogRef = this.dialog.open(UpsertUserModalComponent, {
      width: '450px',
      disableClose: true,
      data: {
        user,
      },
    });
  }

  closeUpsertUserModal(): void {
    if (this.upsertUserDialogRef) {
      this.upsertUserDialogRef.close();
      this.upsertUserDialogRef = null;
    }
  }
}
