import { Organization } from '../organization/Organization';

export interface Encounter {
  id: string;
  status: string;
  priority: string;
  periodStart: Date;
  periodEnd: Date;
  patientId: string;
  organizationId: string;
  patient?: any;
  organization?: Organization;
}
