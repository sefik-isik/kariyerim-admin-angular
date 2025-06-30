import { BaseModel } from '../base/baseModel';

export interface UserDTO extends BaseModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  code: string;
  status: string;
  passwordHash: string;
  passwordSalt: string;
}
