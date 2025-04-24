import { BaseUserDTOModel } from './baseUserDTOModel';

export interface PasswordModel extends BaseUserDTOModel {
  oldPassword: string;
  password: string;
  NewPassword: string;
}
