import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncountersPageComponent } from './components/pages/non-admin/encounters-page/encounters-page.component';
import { HomePageComponent } from './components/pages/shared/home-page/home-page.component';
import { NotFoundPageComponent } from './components/pages/shared/not-found-page/not-found-page.component';
import { OrganizationDetailsPageComponent } from './components/pages/admin/organization-details-page/organization-details-page.component';
import { OrganizationsPageComponent } from './components/pages/admin/organizations-page/organizations-page.component';
import { EncounterDetailsPageComponent } from './components/pages/non-admin/encounter-details/encounter-details-page/encounter-details-page.component';
import { PatientsPageComponent } from './components/pages/non-admin/patients-page/patients-page.component';
import { UsersPageComponent } from './components/pages/admin/users-page/users-page.component';
import { AdminGuard } from './guards/admin.guard';
import { DoctorOrNurseGuard } from './guards/doctor-or-nurse.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'patients',
    component: PatientsPageComponent,
    canActivate: [DoctorOrNurseGuard],
  },
  { path: 'users', component: UsersPageComponent, canActivate: [AdminGuard] },
  {
    path: 'organizations',
    component: OrganizationsPageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'organizations/:id',
    component: OrganizationDetailsPageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admissions',
    component: EncountersPageComponent,
    canActivate: [DoctorOrNurseGuard],
  },
  {
    path: 'admissions/:id',
    component: EncounterDetailsPageComponent,
    canActivate: [DoctorOrNurseGuard],
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
