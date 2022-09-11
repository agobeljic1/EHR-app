import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  OrganizationActions,
  OrganizationSelectors,
} from 'src/app/store/organization';
import { formConfig } from './upsert-organization.form-config';

@Component({
  selector: 'app-upsert-organization-modal',
  templateUrl: './upsert-organization-modal.component.html',
  styleUrls: ['./upsert-organization-modal.component.scss'],
})
export class UpsertOrganizationModalComponent implements OnInit {
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
      OrganizationSelectors.selectLoadingUpsertOrganization as any
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
    if (!this.data.organization) {
      return;
    }
    const { id, displayName, ...formValues } = this.data.organization;
    this.form.setValue(formValues);
  }

  submitUpsertOrganization() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const editMode = !!this.data.organization;
      if (editMode) {
        this.store.dispatch(
          OrganizationActions.updateOrganization({
            organization: {
              id: this.data.organization.id,
              ...this.form.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          OrganizationActions.createOrganization({
            organization: this.form.value,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(OrganizationActions.closeUpsertOrganization());
  }
}
