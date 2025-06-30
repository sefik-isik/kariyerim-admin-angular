import { BaseModel } from './baseModel';

export interface BaseUserModel extends BaseModel {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  code: string;
}
