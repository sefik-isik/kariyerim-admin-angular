import { BaseCompanyUserAdvertDTOModel } from '../base/baseCompanyUserAdvertDTOModel';

export interface CompanyUserAdvertJobDescriptionDTO
  extends BaseCompanyUserAdvertDTOModel {
  title: string;
  description: string;
}
