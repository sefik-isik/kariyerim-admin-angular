import { BaseModel } from './baseModel';

export interface TaxOfficeDTO extends BaseModel {
  cityId: number;
  cityName: string;
  regionName: string;
  taxOfficeCode: number;
  taxOfficeName: string;
}
