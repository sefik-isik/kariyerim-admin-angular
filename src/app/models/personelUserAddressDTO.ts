import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserAddressDTO extends BasePersonelUserDTOModel {
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  addressDetail: string;
}
