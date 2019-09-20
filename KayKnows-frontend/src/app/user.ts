import { Role } from './role';

export class User {
  user_id: number;
  user_password: string;
  user_email: string;
  role_id: number;
  user_admin: number;
  user_full_name: string;
  role: Role;
}
