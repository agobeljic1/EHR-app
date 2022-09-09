import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionsPageComponent } from './components/pages/admissions-page/admissions-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { OrganizationsPageComponent } from './components/pages/organizations-page/organizations-page.component';
import { PatientOverviewPageComponent } from './components/pages/patient-overview-page/patient-overview-page.component';
import { PatientsPageComponent } from './components/pages/patients-page/patients-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'patients', component: PatientsPageComponent },
  { path: 'users', component: UsersPageComponent, canActivate: [AdminGuard] },
  {
    path: 'organizations',
    component: OrganizationsPageComponent,
    canActivate: [AdminGuard],
  },
  { path: 'admissions', component: AdmissionsPageComponent },
  { path: 'patient-overview', component: PatientOverviewPageComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
