import { BaseCompanyUserModel } from './baseCompanyUserModel';

export interface CompanyUser extends BaseCompanyUserModel {
  sectorId: number;
  taxCityId: number;
  taxOfficeId: number;
  taxNumber: string;
}
