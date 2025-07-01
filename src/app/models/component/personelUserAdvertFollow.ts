import { BaseAdvertModel } from '../base/baseAdvertModel';

export interface PersonelUserAdvertFollow extends BaseAdvertModel {
  companyUserId: string;
  personelUserId: string;
}
