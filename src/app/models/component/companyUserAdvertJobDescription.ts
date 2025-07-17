import { BaseCompanyUserModel } from '../base/baseCompanyUserModel';

export interface CompanyUserAdvertJobDescription extends BaseCompanyUserModel {
  advertId: string;
  title: string;
  description: string;
}
