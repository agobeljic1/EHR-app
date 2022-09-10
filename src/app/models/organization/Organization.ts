import { User } from '../user/User';

export interface Organization {
  id: string;
  name: string;
  line: string;
  city: string;
  country: string;
  users?: User[];
}
