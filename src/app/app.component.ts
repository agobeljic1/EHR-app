import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions, AuthSelectors } from './store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.refreshToken());

    this.loading$ = this.store.select(
      AuthSelectors.selectLoadingProfile as any
    );
  }
}
