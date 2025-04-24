import { BaseModel } from './baseModel';

export interface TaxOffice extends BaseModel {
  cityId: number;
  regionName: string;
  taxOfficeCode: number;
  taxOfficeName: string;
}
