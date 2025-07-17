import { BaseModel } from '../base/baseModel';

export interface PersonelUserFollowCompanyUserDTO extends BaseModel {
  companyUserId: string;
  companyUserName: string;
  personelUserId: string;
  personelUserMail: string;
}
