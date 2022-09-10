import { createReducer, on } from '@ngrx/store';
import { Organization } from 'src/app/models/organization/Organization';
import { User } from 'src/app/models/user/User';
import {
  addNewUserToOrganization,
  addNewUserToOrganizationFailure,
  addNewUserToOrganizationSuccess,
  closeAddUserToOrganization,
  closeUpsertOrganization,
  createOrganization,
  createOrganizationFailure,
  createOrganizationSuccess,
  deleteOrganization,
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
  loadOrganizationByIdFromRoute,
  loadOrganizationByIdFromRouteFailure,
  loadOrganizationByIdFromRouteSuccess,
  loadOrganizations,
  loadOrganizationsFailure,
  loadOrganizationsSuccess,
  loadOrganizationUsersByIdFromRoute,
  loadOrganizationUsersByIdFromRouteFailure,
  loadOrganizationUsersByIdFromRouteSuccess,
  openAddUserToOrganization,
  openUpsertOrganization,
  removeUserFromOrganization,
  removeUserFromOrganizationFailure,
  removeUserFromOrganizationSuccess,
  setActiveUserToAddToOrganization,
  updateOrganization,
  updateOrganizationFailure,
  updateOrganizationSuccess,
} from './organization.actions';

export interface OrganizationState {
  organizations: Organization[];
  loadingOrganizations: boolean;
  upsertOrganizationOpen: boolean;
  upsertOrganizationData: Organization | null;
  loadingUpsertOrganization: boolean;
  loadingDeleteOrganization: boolean;
  loadingOrganizationById: boolean;
  loadingOrganizationUsersById: boolean;
  organizationById: Organization | null;
  organizationUsersById: User[] | null;
  addUserToOrganizationOpen: boolean;
  addUserToOrganizationData: Organization | null;
  activeRemovingUserIdFromOrganization: string | null;
  loadingAddUserToOrganization: boolean;
  activeUserToAddToOrganization: User | null;
}

export const initialState: OrganizationState = {
  organizations: [],
  loadingOrganizations: false,
  upsertOrganizationOpen: false,
  upsertOrganizationData: null,
  loadingUpsertOrganization: false,
  loadingDeleteOrganization: false,
  loadingOrganizationById: false,
  loadingOrganizationUsersById: false,
  organizationById: null,
  organizationUsersById: null,
  addUserToOrganizationOpen: false,
  addUserToOrganizationData: null,
  activeRemovingUserIdFromOrganization: null,
  loadingAddUserToOrganization: false,
  activeUserToAddToOrganization: null,
};

export const organizationReducer = createReducer(
  initialState,
  on(loadOrganizations, (state) => ({ ...state, loadingOrganizations: true })),
  on(loadOrganizationsSuccess, (state, { organizations }) => ({
    ...state,
    organizations,
    loadingOrganizations: false,
  })),
  on(loadOrganizationsFailure, (state) => ({
    ...state,
    loadingOrganizations: false,
  })),
  on(openUpsertOrganization, (state, { organization }) => ({
    ...state,
    upsertOrganizationData: organization,
    upsertOrganizationOpen: true,
  })),
  on(closeUpsertOrganization, (state) => ({
    ...state,
    upsertOrganizationData: null,
    upsertOrganizationOpen: false,
  })),
  on(createOrganization, (state) => ({
    ...state,
    loadingUpsertOrganization: true,
  })),
  on(createOrganizationSuccess, (state) => ({
    ...state,
    loadingUpsertOrganization: false,
  })),
  on(createOrganizationFailure, (state) => ({
    ...state,
    loadingUpsertOrganization: false,
  })),
  on(updateOrganization, (state) => ({
    ...state,
    loadingUpsertOrganization: true,
  })),
  on(updateOrganizationSuccess, (state) => ({
    ...state,
    loadingUpsertOrganization: false,
  })),
  on(updateOrganizationFailure, (state) => ({
    ...state,
    loadingUpsertOrganization: false,
  })),
  on(deleteOrganization, (state, { organization }) => ({
    ...state,
    activeDeleteOrganizationId: organization.id,
  })),
  on(deleteOrganizationSuccess, (state) => ({
    ...state,
    activeDeleteOrganizationId: null,
  })),
  on(deleteOrganizationFailure, (state) => ({
    ...state,
    activeDeleteOrganizationId: null,
  })),
  on(loadOrganizationByIdFromRoute, (state) => ({
    ...state,
    loadingOrganizationById: true,
  })),
  on(loadOrganizationByIdFromRouteSuccess, (state, { organization }) => ({
    ...state,
    loadingOrganizationById: false,
    organizationById: organization,
  })),
  on(loadOrganizationByIdFromRouteFailure, (state) => ({
    ...state,
    loadingOrganizationById: false,
    organizationById: null,
  })),
  on(loadOrganizationUsersByIdFromRoute, (state) => ({
    ...state,
    loadingOrganizationUsersById: true,
  })),
  on(loadOrganizationUsersByIdFromRouteSuccess, (state, { users }) => ({
    ...state,
    loadingOrganizationUsersById: false,
    organizationUsersById: users,
  })),
  on(loadOrganizationUsersByIdFromRouteFailure, (state) => ({
    ...state,
    loadingOrganizationUsersById: false,
    organizationUsersById: null,
  })),
  on(openAddUserToOrganization, (state, { organization }) => ({
    ...state,
    addUserToOrganizationOpen: true,
    addUserToOrganizationData: organization,
  })),
  on(closeAddUserToOrganization, (state) => ({
    ...state,
    addUserToOrganizationOpen: false,
    addUserToOrganizationData: null,
    activeUserToAddToOrganization: null,
  })),
  on(addNewUserToOrganization, (state) => ({
    ...state,
    loadingAddUserToOrganization: true,
  })),
  on(addNewUserToOrganizationSuccess, (state) => ({
    ...state,
    loadingAddUserToOrganization: false,
    activeUserToAddToOrganization: null,
  })),
  on(addNewUserToOrganizationFailure, (state) => ({
    ...state,
    loadingAddUserToOrganization: false,
  })),
  on(removeUserFromOrganization, (state, { user }) => ({
    ...state,
    activeRemovingUserIdFromOrganization: user.id,
  })),
  on(removeUserFromOrganizationSuccess, (state) => ({
    ...state,
    activeRemovingUserIdFromOrganization: null,
  })),
  on(removeUserFromOrganizationFailure, (state) => ({
    ...state,
    activeRemovingUserIdFromOrganization: null,
  })),
  on(setActiveUserToAddToOrganization, (state, { user }) => ({
    ...state,
    activeUserToAddToOrganization: user,
  }))
);
