import { BaseModel } from '../base/baseModel';

export interface CompanyFollowDTO extends BaseModel {
  personelUserId: string;
  companyUserId: string;
}
