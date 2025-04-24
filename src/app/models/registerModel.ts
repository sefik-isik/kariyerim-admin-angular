import { BaseModel } from './baseModel';

export interface RegisterModel extends BaseModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
