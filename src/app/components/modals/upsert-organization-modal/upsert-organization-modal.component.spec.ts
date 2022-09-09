import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertOrganizationModalComponent } from './upsert-organization-modal.component';

describe('UpsertOrganizationModalComponent', () => {
  let component: UpsertOrganizationModalComponent;
  let fixture: ComponentFixture<UpsertOrganizationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertOrganizationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertOrganizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
