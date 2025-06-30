import { BaseCompanyUserDTOModel } from '../base/baseCompanyUserDTOModel';

export interface CompanyUserAddressDTO extends BaseCompanyUserDTOModel {
  countryId: string;
  countryName: string;
  cityId: string;
  cityName: string;
  regionId: string;
  regionName: string;
  addressDetail: string;
}
