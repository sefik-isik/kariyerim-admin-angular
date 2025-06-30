import { BaseCompanyUserModel } from '../base/baseCompanyUserModel';

export interface CompanyUserAddress extends BaseCompanyUserModel {
  countryId: string;
  cityId: string;
  regionId: string;
  addressDetail: string;
}
