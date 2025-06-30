import { BaseModel } from '../base/baseModel';

export interface RegionDTO extends BaseModel {
  countryId: string;
  countryName: string;
  cityId: string;
  cityName: string;
  cityCode: string;
  regionName: string;
}
