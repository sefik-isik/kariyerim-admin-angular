import { BaseModel } from '../base/baseModel';

export interface Country extends BaseModel {
  countryName: string;
  countryIso: string;
}
