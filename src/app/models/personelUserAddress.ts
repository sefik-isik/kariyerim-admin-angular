import { BasePersonelUserModel } from './basePersonelUserModel';

export interface PersonelUserAddress extends BasePersonelUserModel {
  countryId: number;
  cityId: number;
  regionId: number;
  addressDetail: string;
}
