import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, tap } from 'rxjs';
import { User } from 'src/app/models/user/User';
import {
  OrganizationActions,
  OrganizationSelectors,
} from 'src/app/store/organization';
import { UserActions, UserSelectors } from 'src/app/store/user';

@Component({
  selector: 'app-add-user-to-organization-modal',
  templateUrl: './add-user-to-organization-modal.component.html',
  styleUrls: ['./add-user-to-organization-modal.component.scss'],
})
export class AddUserToOrganizationModalComponent implements OnInit {
  private readonly destroy$ = new Subject();

  loading$!: Observable<boolean>;

  loadingUsers$!: Observable<boolean>;
  users$!: Observable<any[]>;
  selectedUser$!: Observable<User>;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(
      OrganizationSelectors.selectLoadingAddUserToOrganization as any
    );
    this.loadingUsers$ = this.store.select(
      UserSelectors.selectLoadingSearchUsersByQuery as any
    );
    this.users$ = this.store
      .select(UserSelectors.selectFoundUsersByQuery as any)
      .pipe(
        tap((a: any) => {
          console.log(a);
        })
      );

    this.selectedUser$ = this.store.select(
      OrganizationSelectors.selectActiveUserToAddToOrganization as any
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  submitAddUserToOrganization(user) {
    this.store.dispatch(
      OrganizationActions.addNewUserToOrganization({
        organization: this.data.organization,
        user,
      })
    );
  }

  close() {
    this.store.dispatch(OrganizationActions.closeAddUserToOrganization());
  }

  searchUsers(query: string) {
    this.store.dispatch(UserActions.searchUsersByQuery({ query }));
  }

  selectUser(user: User) {
    this.store.dispatch(
      OrganizationActions.setActiveUserToAddToOrganization({ user })
    );
  }
}
