import { BaseCompanyUserDTOModel } from './baseCompanyUserDTOModel';

export interface CompanyUserImageDTO extends BaseCompanyUserDTOModel {
  imageOwnName: string;
  imageName: string;
  imagePath: string;
}
