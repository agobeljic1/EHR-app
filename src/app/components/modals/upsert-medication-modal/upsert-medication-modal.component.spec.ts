import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertMedicationModalComponent } from './upsert-medication-modal.component';

describe('UpsertMedicationModalComponent', () => {
  let component: UpsertMedicationModalComponent;
  let fixture: ComponentFixture<UpsertMedicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertMedicationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertMedicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
