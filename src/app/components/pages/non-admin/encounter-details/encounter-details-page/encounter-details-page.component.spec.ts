import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterDetailsPageComponent } from './encounter-details-page.component';

describe('EncounterDetailsPageComponent', () => {
  let component: EncounterDetailsPageComponent;
  let fixture: ComponentFixture<EncounterDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncounterDetailsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
