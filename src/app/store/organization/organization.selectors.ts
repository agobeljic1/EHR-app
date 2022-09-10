import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { OrganizationState } from './organization.reducers';

export const selectOrganizations = (state: AppState) => state.organizationState;

export const selectAllOrganizations = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.organizations
);

export const selectLoadingOrganizations = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.loadingOrganizations
);

export const selectUpsertOrganizationOpen = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.upsertOrganizationOpen
);

export const selectUpsertOrganizationData = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.upsertOrganizationData
);

export const selectLoadingUpsertOrganization = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.loadingUpsertOrganization
);

export const selectLoadingDeleteOrganization = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.loadingDeleteOrganization
);

export const selectOrganizationById = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.organizationById
);

export const selectLoadingOrganizationById = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.loadingOrganizationById
);

export const selectAddUserToOrganizationOpen = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.addUserToOrganizationOpen
);

export const selectAddUserToOrganizationData = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.addUserToOrganizationData
);

export const selectLoadingAddUserToOrganization = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.loadingAddUserToOrganization
);

export const selectActiveRemovingUserIdFromOrganization = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.activeRemovingUserIdFromOrganization
);

export const selectActiveUserToAddToOrganization = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.activeUserToAddToOrganization
);

export const selectOrganizationUsersById = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.organizationUsersById
);

export const selectLoadingOrganizationUsersById = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.loadingOrganizationUsersById
);
