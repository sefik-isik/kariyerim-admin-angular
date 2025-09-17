import { BaseModel } from './baseModel';

export interface BaseAdvertModel extends BaseModel {
  companyUserId: string;
  personelUserId: string;
  personelUserCvId: string;
}
