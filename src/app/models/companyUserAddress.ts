import { BaseCompanyUserModel } from './baseCompanyUserModel';

export interface CompanyUserAddress extends BaseCompanyUserModel {
  countryId: number;
  cityId: number;
  regionId: number;
  addressDetail: string;
}
