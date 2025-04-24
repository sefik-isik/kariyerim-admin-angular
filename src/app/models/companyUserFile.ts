import { BaseCompanyUserModel } from './baseCompanyUserModel';

export interface CompanyUserFile extends BaseCompanyUserModel {
  fileName: string;
  filePath: string;
}
