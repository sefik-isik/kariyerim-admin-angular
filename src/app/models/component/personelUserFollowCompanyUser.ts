import { BaseModel } from '../base/baseModel';

export interface PersonelUserFollowCompanyUser extends BaseModel {
  companyUserId: string;
  personelUserId: string;
}
