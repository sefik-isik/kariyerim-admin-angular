import { BaseModel } from './baseModel';

export interface Country extends BaseModel {
  countryName: string;
  countryIso: string;
}
