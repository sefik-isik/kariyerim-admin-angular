import { BaseCompanyUserDTOModel } from './baseCompanyUserDTOModel';

export interface CompanyUserFileDTO extends BaseCompanyUserDTOModel {
  fileName: string;
  filePath: string;
}
