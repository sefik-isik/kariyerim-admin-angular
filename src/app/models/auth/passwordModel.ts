import { BaseUserModel } from '../base/baseUserModel';

export interface PasswordModel extends BaseUserModel {
  oldPassword: string;
  password: string;
  newPassword: string;
}
