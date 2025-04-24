import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserAddressDTO extends BasePersonelUserDTOModel {
  countryName: string;
  cityName: string;
  regionName: string;
  addressDetail: string;
}
