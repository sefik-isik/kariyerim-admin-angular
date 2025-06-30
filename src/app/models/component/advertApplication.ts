import { BaseAdvertModel } from '../base/baseAdvertModel';

export interface AdvertApplication extends BaseAdvertModel {
  companyUserId: string;
  personelUserId: string;
}
