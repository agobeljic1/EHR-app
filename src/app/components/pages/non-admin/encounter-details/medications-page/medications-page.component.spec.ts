import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsPageComponent } from './medications-page.component';

describe('MedicationsPageComponent', () => {
  let component: MedicationsPageComponent;
  let fixture: ComponentFixture<MedicationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
