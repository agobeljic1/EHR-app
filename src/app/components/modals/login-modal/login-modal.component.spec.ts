import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { provideMockStore } from '@ngrx/store/testing';

import { LoginModalComponent } from './login-modal.component';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid form', () => {
    component.ngOnInit();
    component.form.setValue({
      email: 'myusername',
      password: 'mypassword',
    });
    expect(component.form.valid).toBeTrue();
  });

  it('emailAddress should be invalid when empty', () => {
    component.ngOnInit();
    component.form.controls?.['emailAddress'].setValue('');

    expect(
      component.form.controls?.['emailAddress'].errors?.['required']
    ).toBeTruthy();
  });

  it('emailAddress should be invalid when not an email', () => {
    component.ngOnInit();
    component.form.controls?.['emailAddress'].setValue('yeahman');

    expect(
      component.form.controls?.['emailAddress'].errors?.['email']
    ).toBeTruthy();
  });

  it('emailAddress should be valid when proper email', () => {
    component.ngOnInit();
    component.form.controls?.['emailAddress'].setValue('example@yahoo.com');

    expect(component.form.controls?.['emailAddress'].valid).toBeTruthy();
  });

  it('password should be invalid when empty', () => {
    component.ngOnInit();
    component.form.controls?.['password'].setValue('');

    expect(
      component.form.controls?.['password'].errors?.['required']
    ).toBeTruthy();
  });

  it('password should be valid when valid', () => {
    component.ngOnInit();
    component.form.controls?.['password'].setValue('123456');
    expect(component.form.controls?.['password'].valid).toBeTruthy();
  });
});
