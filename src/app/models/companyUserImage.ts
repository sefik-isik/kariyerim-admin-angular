import { BaseCompanyUserModel } from './baseCompanyUserModel';

export interface CompanyUserImage extends BaseCompanyUserModel {
  imageName: string;
  imagePath: string;
}
