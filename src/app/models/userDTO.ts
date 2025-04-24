import { BaseModel } from './baseModel';

export interface UserDTO extends BaseModel {
  id: number;
  email: string;
}
