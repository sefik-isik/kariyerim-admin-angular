import { BaseUserModel } from './baseUserModel';

export interface BaseCompanyUserDTOModel extends BaseUserModel {
  companyUserId: string;
  companyUserName: string;
}
