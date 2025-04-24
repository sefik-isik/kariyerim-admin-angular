import { BaseModel } from './baseModel';

export interface CityDTO extends BaseModel {
  cityName: string;
  countryId: number;
  countryName: string;
  countryIso: string;
}
