import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  @Output() closeRegister: EventEmitter<void> = new EventEmitter();

  form!: FormGroup;
  loading$!: Observable<boolean>;
  showSuccessMessage$!: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loading$ = this.store.select(
      AuthSelectors.selectLoadingRegister as any
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      firstName: [undefined, [Validators.required]],
      lastName: [undefined, [Validators.required]],
      birthDate: [undefined, [Validators.required]],
      emailAddress: [undefined, [Validators.email, Validators.required]],
      password: [undefined, [Validators.required, Validators.minLength(6)]],
    });
  }

  submitRegister() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.store.dispatch(AuthActions.registerUser({ user: this.form.value }));
    }
  }
}
