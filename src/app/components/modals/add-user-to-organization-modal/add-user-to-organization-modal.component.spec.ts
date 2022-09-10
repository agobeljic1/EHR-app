import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToOrganizationModalComponent } from './add-user-to-organization-modal.component';

describe('AddUserToOrganizationModalComponent', () => {
  let component: AddUserToOrganizationModalComponent;
  let fixture: ComponentFixture<AddUserToOrganizationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToOrganizationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToOrganizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
