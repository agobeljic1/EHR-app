import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/models/organization/Organization';
import { AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  loggedUser$!: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(AuthSelectors.selectUser as any);
  }
}
