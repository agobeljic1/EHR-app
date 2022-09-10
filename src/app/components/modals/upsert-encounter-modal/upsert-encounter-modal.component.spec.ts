import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertEncounterModalComponent } from './upsert-encounter-modal.component';

describe('UpsertEncounterModalComponent', () => {
  let component: UpsertEncounterModalComponent;
  let fixture: ComponentFixture<UpsertEncounterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertEncounterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertEncounterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
