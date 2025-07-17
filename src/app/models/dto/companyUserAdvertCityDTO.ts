import { BaseCompanyUserDTOModel } from '../base/baseCompanyUserDTOModel';

export interface CompanyUserAdvertCityDTO extends BaseCompanyUserDTOModel {
  advertId: string;
  advertName: string;
  workCityId: string;
  workCityName: string;
}
