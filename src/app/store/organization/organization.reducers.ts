import { createReducer, on } from '@ngrx/store';
import { Organization } from 'src/app/models/organization/Organization';
import {
  closeUpsertOrganization,
  createOrganization,
  createOrganizationFailure,
  createOrganizationSuccess,
  deleteOrganization,
  deleteOrganizationFailure,
  deleteOrganizationSuccess,
  loadOrganizations,
  loadOrganizationsFailure,
  loadOrganizationsSuccess,
  openUpsertOrganization,
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
  activeDeleteOrganizationId: string | null;
}

export const initialState: OrganizationState = {
  organizations: [],
  loadingOrganizations: false,
  upsertOrganizationOpen: false,
  upsertOrganizationData: null,
  loadingUpsertOrganization: false,
  activeDeleteOrganizationId: null,
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
  }))
);
