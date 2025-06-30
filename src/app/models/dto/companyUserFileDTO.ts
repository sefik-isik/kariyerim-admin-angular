import { BaseCompanyUserDTOModel } from '../base/baseCompanyUserDTOModel';

export interface CompanyUserFileDTO extends BaseCompanyUserDTOModel {
  fileName: string;
  fileOwnName: string;
  filePath: string;
}
