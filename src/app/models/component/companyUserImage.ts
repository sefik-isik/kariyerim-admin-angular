import { BaseCompanyUserModel } from '../base/baseCompanyUserModel';

export interface CompanyUserImage extends BaseCompanyUserModel {
  imageOwnName: string;
  imageName: string;
  imagePath: string;
  isMainImage: boolean;
  isLogo: boolean;
}
