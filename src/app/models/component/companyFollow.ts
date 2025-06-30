import { BaseModel } from '../base/baseModel';

export interface CompanyFollow extends BaseModel {
  companyUserId: string;
  personelUserId: string;
}
