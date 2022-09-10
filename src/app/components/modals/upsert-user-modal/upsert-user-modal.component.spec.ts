import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertUserModalComponent } from './upsert-user-modal.component';

describe('UpsertUserModalComponent', () => {
  let component: UpsertUserModalComponent;
  let fixture: ComponentFixture<UpsertUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
