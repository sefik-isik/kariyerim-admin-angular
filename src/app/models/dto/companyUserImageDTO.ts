import { BaseCompanyUserDTOModel } from '../base/baseCompanyUserDTOModel';

export interface CompanyUserImageDTO extends BaseCompanyUserDTOModel {
  imageName: string;
  imageOwnName: string;
  imagePath: string;
  isMainImage: boolean;
  isLogo: boolean;
}
