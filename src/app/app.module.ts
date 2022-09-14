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
import { ProfileModalComponent } from './components/modals/profile-modal/profile-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { LetDirective } from './directives/let/let.directive';
import { NotFoundPageComponent } from './components/pages/shared/not-found-page/not-found-page.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EncounterDetailsPageComponent } from './components/pages/non-admin/encounter-details/encounter-details-page/encounter-details-page.component';
import { PatientsPageComponent } from './components/pages/non-admin/patients-page/patients-page.component';
import { UsersPageComponent } from './components/pages/admin/users-page/users-page.component';
import { HomePageComponent } from './components/pages/shared/home-page/home-page.component';
import { AdminGuard } from './guards/admin.guard';
import { OrganizationsPageComponent } from './components/pages/admin/organizations-page/organizations-page.component';
import { OrganizationEffects } from './store/organization/organization.effects';
import { UpsertOrganizationModalComponent } from './components/modals/upsert-organization-modal/upsert-organization-modal.component';
import { UpsertUserModalComponent } from './components/modals/upsert-user-modal/upsert-user-modal.component';
import { UserEffects } from './store/user/user.effects';
import { OrganizationDetailsPageComponent } from './components/pages/admin/organization-details-page/organization-details-page.component';
import { AddUserToOrganizationModalComponent } from './components/modals/add-user-to-organization-modal/add-user-to-organization-modal.component';
import { AutocompleteFieldComponent } from './components/shared/autocomplete-field/autocomplete-field.component';
import { EncountersPageComponent } from './components/pages/non-admin/encounters-page/encounters-page.component';
import { EncounterEffects } from './store/encounter/encounter.effects';
import { UpsertEncounterModalComponent } from './components/modals/upsert-encounter-modal/upsert-encounter-modal.component';
import { UpsertPatientModalComponent } from './components/modals/upsert-patient-modal/upsert-patient-modal.component';
import { PatientEffects } from './store/patient/patient.effects';
import { DoctorOrNurseGuard } from './guards/doctor-or-nurse.guard';
import { ConditionsPageComponent } from './components/pages/non-admin/encounter-details/conditions-page/conditions-page.component';
import { MedicationsPageComponent } from './components/pages/non-admin/encounter-details/medications-page/medications-page.component';
import { ConditionEffects } from './store/condition/condition.effects';
import { UpsertConditionModalComponent } from './components/modals/upsert-condition-modal/upsert-condition-modal.component';
import { AllergysPageComponent } from './components/pages/non-admin/encounter-details/allergys-page/allergys-page.component';
import { UpsertAllergyModalComponent } from './components/modals/upsert-allergy-modal/upsert-allergy-modal.component';
import { AllergyEffects } from './store/allergy/allergy.effects';
import { UpsertMedicationModalComponent } from './components/modals/upsert-medication-modal/upsert-medication-modal.component';
import { MedicationEffects } from './store/medication/medication.effects';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    FormFieldComponent,
    ProfileModalComponent,
    SpinnerComponent,
    LetDirective,
    NotFoundPageComponent,
    EncountersPageComponent,
    EncounterDetailsPageComponent,
    PatientsPageComponent,
    UsersPageComponent,
    HomePageComponent,
    OrganizationsPageComponent,
    UpsertOrganizationModalComponent,
    UpsertUserModalComponent,
    OrganizationDetailsPageComponent,
    AddUserToOrganizationModalComponent,
    AutocompleteFieldComponent,
    EncountersPageComponent,
    UpsertEncounterModalComponent,
    UpsertPatientModalComponent,
    ConditionsPageComponent,
    MedicationsPageComponent,
    UpsertConditionModalComponent,
    AllergysPageComponent,
    UpsertAllergyModalComponent,
    UpsertMedicationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AuthEffects,
      OrganizationEffects,
      UserEffects,
      EncounterEffects,
      PatientEffects,
      ConditionEffects,
      AllergyEffects,
      MedicationEffects,
    ]),
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
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    AdminGuard,
    DoctorOrNurseGuard,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
