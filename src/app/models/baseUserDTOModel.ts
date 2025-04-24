import { BaseUserModel } from './baseUserModel';

export interface BaseUserDTOModel extends BaseUserModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}
