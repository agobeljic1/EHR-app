import { Organization } from '../organization/Organization';

export interface User {
  id: string;
  emailAddress: string;
  password?: string;
  given: string;
  family: string;
  birthDate: Date;
  gender: boolean;
  line: string;
  city: string;
  country: string;
  role: string;
  organizations?: Organization[];
}
