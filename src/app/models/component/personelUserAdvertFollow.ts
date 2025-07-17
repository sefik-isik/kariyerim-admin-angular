import { BaseModel } from '../base/baseModel';

export interface PersonelUserAdvertFollow extends BaseModel {
  companyUserId: string;
  personelUserId: string;
}
