import { BaseModel } from '../base/baseModel';

export interface PersonelUserAdvertFollowDTO extends BaseModel {
  advertId: string;
  advertName: string;
  companyUserId: string;
  companyUserName: string;
  personelUserId: string;
  personelUserMail: string;
}
