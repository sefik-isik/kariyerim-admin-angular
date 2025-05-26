import { BaseCompanyUserDTOModel } from './baseCompanyUserDTOModel';

export interface CompanyUserFileDTO extends BaseCompanyUserDTOModel {
  fileOwnName: string;
  fileName: string;
  filePath: string;
}
