import {UserRole} from './user.role';

export interface UserModel {
  id: number;
  username: string;
  email: string;
  dateRegistered: any;
  roles: UserRole[];
}
