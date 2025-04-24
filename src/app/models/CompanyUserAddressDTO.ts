import { BaseCompanyUserDTOModel } from './baseCompanyUserDTOModel';

export interface CompanyUserAddressDTO extends BaseCompanyUserDTOModel {
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  addressDetail: string;
}
