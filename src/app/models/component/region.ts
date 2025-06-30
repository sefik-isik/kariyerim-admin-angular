import { BaseModel } from '../base/baseModel';

export interface Region extends BaseModel {
  countryId: string;
  cityId: string;
  cityCode: string;
  regionName: string;
}
