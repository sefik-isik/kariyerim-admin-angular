import { BaseCompanyUserDTOModel } from '../base/baseCompanyUserDTOModel';

export interface CompanyUserAdvertJobDescriptionDTO
  extends BaseCompanyUserDTOModel {
  advertId: string;
  advertName: string;
  title: string;
  description: string;
}
