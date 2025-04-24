import { BaseCompanyUserDTOModel } from './baseCompanyUserDTOModel';

export interface CompanyUserDTO extends BaseCompanyUserDTOModel {
  sectorId: number;
  sectorName: string;
  taxCityId: number;
  taxCityName: string;
  taxOfficeId: number;
  taxOfficeName: string;
  taxNumber: string;
}
