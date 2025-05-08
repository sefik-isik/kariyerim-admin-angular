import { BaseUserModel } from './baseUserModel';

export interface PasswordModel extends BaseUserModel {
  oldPassword: string;
  password: string;
  NewPassword: string;
}
