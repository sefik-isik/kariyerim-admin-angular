import { BasePersonelUserModel } from '../base/basePersonelUserModel';

export interface PersonelUserAddress extends BasePersonelUserModel {
  countryId: string;
  cityId: string;
  regionId: string;
  addressDetail: string;
}
