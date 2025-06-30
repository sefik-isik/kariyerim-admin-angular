import { BasePersonelUserDTOModel } from '../base/basePersonelUserDTOModel';

export interface PersonelUserAddressDTO extends BasePersonelUserDTOModel {
  countryId: string;
  countryName: string;
  cityId: string;
  cityName: string;
  regionId: string;
  regionName: string;
  addressDetail: string;
}
