import { BaseModel } from './baseModel';

export interface RegionDTO extends BaseModel {
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  regionName: string;
}
