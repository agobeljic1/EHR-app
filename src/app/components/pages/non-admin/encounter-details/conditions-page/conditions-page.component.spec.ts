import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsPageComponent } from './conditions-page.component';

describe('ConditionsPageComponent', () => {
  let component: ConditionsPageComponent;
  let fixture: ComponentFixture<ConditionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
