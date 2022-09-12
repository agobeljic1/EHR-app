import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertConditionModalComponent } from './upsert-condition-modal.component';

describe('UpsertConditionModalComponent', () => {
  let component: UpsertConditionModalComponent;
  let fixture: ComponentFixture<UpsertConditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertConditionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
