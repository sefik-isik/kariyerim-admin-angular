import { BaseCompanyUserModel } from './baseCompanyUserModel';

export interface CompanyUserImage extends BaseCompanyUserModel {
  imageOwnName: string;
  imageName: string;
  imagePath: string;
}
