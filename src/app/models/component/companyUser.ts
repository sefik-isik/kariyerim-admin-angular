import { BaseUserModel } from '../base/baseUserModel';

export interface CompanyUser extends BaseUserModel {
  companyUserName: string;
  sectorId: string;
  about: string;
  clarification: string;
  workerCount: string;
  yearOfEstablishment: string;
  webAddress: string;
  taxCityId: string;
  taxOfficeId: string;
  taxNumber: string;
}
