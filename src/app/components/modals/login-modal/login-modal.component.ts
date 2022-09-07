import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  @Output() closeLogin: EventEmitter<void> = new EventEmitter();

  form!: FormGroup;
  loading$!: Observable<boolean>;
  showSuccessMessage$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();
    this.loading$ = this.store.select(AuthSelectors.selectLoadingLogin as any);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      emailAddress: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required],
    });
  }

  submitLogin() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(AuthActions.loginUser({ user: this.form.value }));
    }
  }
}
