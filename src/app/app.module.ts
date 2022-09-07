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
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { LetDirective } from './directives/let/let.directive';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    FormFieldComponent,
    RegisterModalComponent,
    ProfileModalComponent,
    HomePageComponent,
    SpinnerComponent,
    LetDirective,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
