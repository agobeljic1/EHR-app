import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAllergyModalComponent } from './upsert-allergy-modal.component';

describe('UpsertAllergyModalComponent', () => {
  let component: UpsertAllergyModalComponent;
  let fixture: ComponentFixture<UpsertAllergyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertAllergyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertAllergyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
