import { BaseAdvertModel } from '../base/baseAdvertModel';

export interface PersonelUserAdvertApplication extends BaseAdvertModel {
  companyUserId: string;
  personelUserId: string;
}
