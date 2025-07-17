import { BaseModel } from '../base/baseModel';

export interface PersonelUserAdvertApplication extends BaseModel {
  companyUserId: string;
  personelUserId: string;
}
