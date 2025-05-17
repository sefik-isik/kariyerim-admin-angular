import { BaseModel } from './baseModel';

export interface BaseUserModel extends BaseModel {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
