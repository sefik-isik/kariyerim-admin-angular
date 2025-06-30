import { BaseUserModel } from './baseUserModel';

export interface BaseCompanyUserModel extends BaseUserModel {
  companyUserId: string;
}
