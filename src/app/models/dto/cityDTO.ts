import { BaseModel } from '../base/baseModel';

export interface CityDTO extends BaseModel {
  countryId: string;
  countryName: string;
  cityCode: string;
  countryIso: string;
  cityName: string;
}
