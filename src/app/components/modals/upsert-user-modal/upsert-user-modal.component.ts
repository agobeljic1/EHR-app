import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { UserActions, UserSelectors } from 'src/app/store/user';
import { formConfig } from './upsert-user.form-config';

@Component({
  selector: 'app-upsert-user-modal',
  templateUrl: './upsert-user-modal.component.html',
  styleUrls: ['./upsert-user-modal.component.scss'],
})
export class UpsertUserModalComponent implements OnInit {
  private readonly destroy$ = new Subject();

  form!: FormGroup;
  loading$!: Observable<boolean>;

  formConfig = formConfig;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populateForm();

    this.loading$ = this.store.select(
      UserSelectors.selectLoadingUpsertUser as any
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

  private populateForm(): void {
    if (!this.data.user) {
      return;
    }
    const { id, displayName, ...formValues } = this.data.user;
    this.form.setValue(formValues);
  }

  submitUpsertUser() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const editMode = !!this.data.user;
      if (editMode) {
        this.store.dispatch(
          UserActions.updateUser({
            user: {
              id: this.data.user.id,
              ...this.form.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          UserActions.createUser({
            user: this.form.value,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(UserActions.closeUpsertUser());
  }
}
