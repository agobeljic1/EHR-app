import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergysPageComponent } from './allergys-page.component';

describe('AllergysPageComponent', () => {
  let component: AllergysPageComponent;
  let fixture: ComponentFixture<AllergysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllergysPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
