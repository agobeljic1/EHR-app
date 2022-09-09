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

export const selectActiveDeleteOrganizationId = createSelector(
  selectOrganizations,
  (state: OrganizationState) => state.activeDeleteOrganizationId
);
