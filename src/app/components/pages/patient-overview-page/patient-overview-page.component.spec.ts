import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOverviewPageComponent } from './patient-overview-page.component';

describe('PatientOverviewPageComponent', () => {
  let component: PatientOverviewPageComponent;
  let fixture: ComponentFixture<PatientOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
