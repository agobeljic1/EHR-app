import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  @Input() user!: any;
  @Output() closeProfile: EventEmitter<void> = new EventEmitter();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(AuthActions.logoutUser());
    this.closeProfile.emit();
  }
}
