import { BaseUserDTOModel } from './baseUserDTOModel';

export interface BaseCompanyUserDTOModel extends BaseUserDTOModel {
  companyUserId: number;
  companyUserName: string;
}
