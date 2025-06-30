import { BaseCompanyUserAdvertDTOModel } from '../base/baseCompanyUserAdvertDTOModel';

export interface CompanyUserAdvertCityDTO
  extends BaseCompanyUserAdvertDTOModel {
  workCityId: string;
  workCityName: string;
}
