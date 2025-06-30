import { BaseModel } from '../base/baseModel';

export interface TaxOffice extends BaseModel {
  cityId: string;
  regionName: string;
  taxOfficeCode: string;
  taxOfficeName: string;
}
