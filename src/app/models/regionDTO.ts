import { BaseModel } from './baseModel';

export interface RegionDTO extends BaseModel {
  cityId: number;
  cityName: string;
  regionName: string;
}
