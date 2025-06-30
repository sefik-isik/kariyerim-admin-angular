import { BaseCompanyUserAdvertModel } from '../base/baseCompanyUserAdvertModel';

export interface CompanyUserAdvertJobDescription
  extends BaseCompanyUserAdvertModel {
  title: string;
  description: string;
}
