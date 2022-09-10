import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPatientModalComponent } from './upsert-patient-modal.component';

describe('UpsertPatientModalComponent', () => {
  let component: UpsertPatientModalComponent;
  let fixture: ComponentFixture<UpsertPatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertPatientModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertPatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
