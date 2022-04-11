import {Role} from "./role";

export interface AccToken {
  id?: number;
  avatar_url?: string;
  name?: string;
  phone_number?: string;
  date_birth?: string;
  address?: string;
  status?: boolean;
  gmail?: string;
  password?: string;
  accessToken?: string;
  roles?: [Role];
}
