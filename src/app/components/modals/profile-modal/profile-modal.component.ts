import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions, AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  loggedUser$!: Observable<any>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(AuthSelectors.selectUser as any);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutUser());
  }

  close() {
    this.store.dispatch(AuthActions.closeProfile());
  }
}
