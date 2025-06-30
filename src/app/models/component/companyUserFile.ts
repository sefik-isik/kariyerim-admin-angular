import { BaseCompanyUserModel } from '../base/baseCompanyUserModel';

export interface CompanyUserFile extends BaseCompanyUserModel {
  fileName: string;
  fileOwnName: string;
  filePath: string;
}
