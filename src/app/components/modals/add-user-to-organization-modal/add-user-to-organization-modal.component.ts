import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user/User';
import {
  OrganizationActions,
  OrganizationSelectors,
} from 'src/app/store/organization';
import { UserActions, UserSelectors } from 'src/app/store/user';
import { formConfig } from './add-user-to-organization.form-config';

@Component({
  selector: 'app-add-user-to-organization-modal',
  templateUrl: './add-user-to-organization-modal.component.html',
  styleUrls: ['./add-user-to-organization-modal.component.scss'],
})
export class AddUserToOrganizationModalComponent implements OnInit {
  private readonly destroy$ = new Subject();

  form!: FormGroup;
  loading$!: Observable<boolean>;

  loadingUsers$!: Observable<boolean>;
  users$!: Observable<any[]>;
  selectedUser$!: Observable<User>;

  formConfig = formConfig;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.loading$ = this.store.select(
      OrganizationSelectors.selectLoadingAddUserToOrganization as any
    );
    this.loadingUsers$ = this.store.select(
      UserSelectors.selectLoadingSearchUsersByQuery as any
    );
    this.users$ = this.store.select(
      UserSelectors.selectFoundUsersByQuery as any
    );

    this.selectedUser$ = this.store.select(
      OrganizationSelectors.selectActiveUserToAddToOrganization as any
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private createForm(): void {
    const formBuilderConfig = Object.entries(this.formConfig).reduce(
      (acc, [key, val]) => {
        acc[key] = val.attributes;
        return acc;
      },
      {}
    );
    this.form = this.formBuilder.group(formBuilderConfig);
  }

  submitAddUserToOrganization(user) {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(
        OrganizationActions.addNewUserToOrganization({
          organization: this.data.organization,
          user,
        })
      );
    }
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
