import { UserRole } from './user-role.model';
import { Area } from '../../../domain/area/area-model';

export interface UserInfo {
  name: string;
  email: string;
  rol: UserRole;
  areas: Area[];
}
