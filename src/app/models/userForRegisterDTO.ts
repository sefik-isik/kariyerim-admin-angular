import { BaseModel } from './baseModel';

export interface UserForRegisterDTO extends BaseModel {
  email: string;
  password: string;
  firstName: number;
  lastName: number;
  phoneNumber: number;
}
