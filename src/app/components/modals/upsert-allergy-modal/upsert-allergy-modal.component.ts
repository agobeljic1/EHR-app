import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  AllergyActions,
  AllergySelectors,
} from '../../../../app/store/allergy';
import { formConfig } from './upsert-allergy.form-config';

@Component({
  selector: 'app-upsert-allergy-modal',
  templateUrl: './upsert-allergy-modal.component.html',
  styleUrls: ['./upsert-allergy-modal.component.scss'],
})
export class UpsertAllergyModalComponent implements OnInit {
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
      AllergySelectors.selectLoadingUpsertAllergy as any
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
    if (!this.data.allergy) {
      return;
    }
    const {
      id,
      displayName,
      recordedDate,
      recorder,
      encounterId,
      userGiven,
      userFamily,
      ...formValues
    } = this.data.allergy;
    this.form.setValue(formValues);
  }

  submitUpsertAllergy() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const editMode = !!this.data.allergy;
      if (editMode) {
        this.store.dispatch(
          AllergyActions.updateAllergy({
            allergy: {
              id: this.data.allergy.id,
              ...this.form.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          AllergyActions.createAllergy({
            allergy: this.form.value,
          })
        );
      }
    }
  }

  close() {
    this.store.dispatch(AllergyActions.closeUpsertAllergy());
  }
}
