import { Area } from '@models/domain/area/area-model';
import { UserRole } from './user-role.model';

export interface UserInfo {
  name: string;
  email: string;
  rol: UserRole;
  areas: Area[];
}
