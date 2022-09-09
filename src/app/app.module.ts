import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/app.state';
import { AuthEffects } from './store/auth/auth.effects';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { FormFieldComponent } from './components/shared/form-field/form-field.component';
import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { ProfileModalComponent } from './components/modals/profile-modal/profile-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { LetDirective } from './directives/let/let.directive';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdmissionsPageComponent } from './components/pages/admissions-page/admissions-page.component';
import { PatientOverviewPageComponent } from './components/pages/patient-overview-page/patient-overview-page.component';
import { PatientsPageComponent } from './components/pages/patients-page/patients-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AdminGuard } from './guards/admin.guard';
import { OrganizationsPageComponent } from './components/pages/organizations-page/organizations-page.component';
import { OrganizationEffects } from './store/organization/organization.effects';
import { UpsertOrganizationModalComponent } from './components/modals/upsert-organization-modal/upsert-organization-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    FormFieldComponent,
    RegisterModalComponent,
    ProfileModalComponent,
    SpinnerComponent,
    LetDirective,
    NotFoundPageComponent,
    AdmissionsPageComponent,
    PatientOverviewPageComponent,
    PatientsPageComponent,
    UsersPageComponent,
    HomePageComponent,
    OrganizationsPageComponent,
    UpsertOrganizationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, OrganizationEffects]),
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AdminGuard,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
