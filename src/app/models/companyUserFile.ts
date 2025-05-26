import { BaseCompanyUserModel } from './baseCompanyUserModel';

export interface CompanyUserFile extends BaseCompanyUserModel {
  fileOwnName: string;
  fileName: string;
  filePath: string;
}
