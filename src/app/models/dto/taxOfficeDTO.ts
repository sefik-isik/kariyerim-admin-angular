import { BaseModel } from '../base/baseModel';

export interface TaxOfficeDTO extends BaseModel {
  cityId: string;
  cityCode: string;
  cityName: string;
  regionName: string;
  taxOfficeCode: string;
  taxOfficeName: string;
}
