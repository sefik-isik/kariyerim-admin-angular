import { BaseAdvertModel } from '../base/baseAdvertModel';

export interface AdvertFollow extends BaseAdvertModel {
  companyUserId: string;
  personelUserId: string;
}
