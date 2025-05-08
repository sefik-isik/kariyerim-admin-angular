import { BaseUserModel } from './baseUserModel';

export interface BaseCompanyUserDTOModel extends BaseUserModel {
  companyUserId: number;
  companyUserName: string;
}
