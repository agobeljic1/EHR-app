import { createAction, props } from '@ngrx/store';
import { Organization } from 'src/app/models/organization/Organization';

export const loadOrganizations = createAction(
  '[Organization Page] Load Organizations'
);

export const loadOrganizationsSuccess = createAction(
  '[Organization API] Organization Load Success',
  props<{ organizations: Organization[] }>()
);

export const loadOrganizationsFailure = createAction(
  '[Organization API] Organization Load Failure'
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
  '[Organization API] Update Organization Success'
);

export const updateOrganizationFailure = createAction(
  '[Organization API] Update Organization Failure'
);

export const deleteOrganization = createAction(
  '[Organization Page] Delete Organization',
  props<{ organization: Organization }>()
);

export const deleteOrganizationSuccess = createAction(
  '[Organization API] Delete Organization Success'
);

export const deleteOrganizationFailure = createAction(
  '[Organization API] Delete Organization Failure'
);
