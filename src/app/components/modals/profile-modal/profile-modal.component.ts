import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';
import { formConfig } from './profile.form-config';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  loggedUser$!: Observable<any>;

  form!: FormGroup;
  formConfig = formConfig;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(AuthSelectors.selectUser as any);

    this.createForm();
    this.populateForm();

    this.form.valueChanges.subscribe(({ organization }) => {
      this.store.dispatch(AuthActions.selectOrganization({ organization }));
    });
  }

  private populateForm(): void {
    this.loggedUser$.pipe(first()).subscribe((user) => {
      // console.log(user);
      const { selectedOrganizationId } = user;
      const selectedOrganization = (user?.organizations || []).find((org) => {
        return +org.id === +selectedOrganizationId;
      });
      // debugger;
      if (selectedOrganization) {
        this.form.controls['organization'].setValue(selectedOrganization);
      }
    });
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

  logout(): void {
    this.store.dispatch(AuthActions.logoutUser());
  }

  close() {
    this.store.dispatch(AuthActions.closeProfile());
  }
}
