import { ActivatedRoute } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import { Organization } from 'src/app/models/organization/Organization';
import { User } from 'src/app/models/user/User';

export const loadOrganizations = createAction(
  '[Organization Page] Load Organizations'
);

export const loadOrganizationsSuccess = createAction(
  '[Organization API] Organizations Load Success',
  props<{ organizations: Organization[] }>()
);

export const loadOrganizationsFailure = createAction(
  '[Organization API] Organizations Load Failure'
);

export const openUpsertOrganization = createAction(
  '[Login Modal] Open Upsert Organization',
  props<{ organization: Organization | null }>()
);

export const closeUpsertOrganization = createAction(
  '[Login Modal] Close Upsert Organization'
);

export const createOrganization = createAction(
  '[Organization Page] Create Organization',
  props<{ organization: Organization }>()
);

export const createOrganizationSuccess = createAction(
  '[Organization API] Create Organization Success'
);

export const createOrganizationFailure = createAction(
  '[Organization API] Create Organization Failure'
);

export const updateOrganization = createAction(
  '[Organization Page] Update Organization',
  props<{ organization: Organization }>()
);

export const updateOrganizationSuccess = createAction(
  '[Organization API] Update Organization Success',
  props<{ organizationId: string }>()
);

export const updateOrganizationFailure = createAction(
  '[Organization API] Update Organization Failure'
);

export const deleteOrganization = createAction(
  '[Organization Page] Delete Organization',
  props<{ organization: Organization }>()
);

export const deleteOrganizationSuccess = createAction(
  '[Organization API] Delete Organization Success',
  props<{ organizationId: string }>()
);

export const deleteOrganizationFailure = createAction(
  '[Organization API] Delete Organization Failure'
);

export const showOrganizationDetails = createAction(
  '[Organizations Page] Show Organization Details',
  props<{ organization: Organization }>()
);

export const showOrganizationDetailsSuccess = createAction(
  '[Organizations Page] Show Organization Details Success'
);

export const showOrganizationsSuccess = createAction(
  '[Organization Details Page] Show Organizations Success'
);

export const loadOrganizationByIdFromRoute = createAction(
  '[Organization Details Page] Load Organization By Id From Route',
  props<{ organizationId: string }>()
);

export const loadOrganizationByIdFromRouteSuccess = createAction(
  '[Organization Details Page] Load Organization By Id From Route Success',
  props<{ organization: Organization }>()
);

export const loadOrganizationByIdFromRouteFailure = createAction(
  '[Organization Details Page] Load Organization By Id From Route Failure'
);

export const loadOrganizationUsersByIdFromRoute = createAction(
  '[Organization Details Page] Load Organization Users By Id From Route',
  props<{ organizationId: string }>()
);

export const loadOrganizationUsersByIdFromRouteSuccess = createAction(
  '[Organization Details Page] Load Organization Users By Id From Route Success',
  props<{ organizationId: string; users: User[] }>()
);

export const loadOrganizationUsersByIdFromRouteFailure = createAction(
  '[Organization Details Page] Load Organization Users By Id From Route Failure'
);

export const openAddUserToOrganization = createAction(
  '[Organization Details Page] Open Add User To Organization',
  props<{ organization: Organization }>()
);

export const closeAddUserToOrganization = createAction(
  '[Organization Details Page] Close Add User To Organization'
);

export const addNewUserToOrganization = createAction(
  '[Organization Details Page] Add New User To Organization',
  props<{ organization: Organization; user: User }>()
);

export const addNewUserToOrganizationSuccess = createAction(
  '[Organization API] Add New User To Organization Success',
  props<{ organizationId: string }>()
);

export const addNewUserToOrganizationFailure = createAction(
  '[Organization API] Add New User To Organization Failure'
);

export const removeUserFromOrganization = createAction(
  '[Organization Details Page] Remove User From Organization',
  props<{ organization: Organization; user: User }>()
);

export const removeUserFromOrganizationSuccess = createAction(
  '[Organization API] Remove User From Organization Success',
  props<{ organizationId: string }>()
);

export const removeUserFromOrganizationFailure = createAction(
  '[Organization API] Remove User From Organization Failure'
);

export const setActiveUserToAddToOrganization = createAction(
  '[Organization Details Page] Select Active User To Add To Organization',
  props<{ user: User }>()
);

export const setOrganizationId = createAction(
  '[Organization Details Page] Set Organization Id',
  props<{ user: User }>()
);

export const loadOrganizationUsers = createAction(
  '[Organization Details Page] Load Organization Users',
  props<{ organization: Organization }>()
);
