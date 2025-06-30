import { BaseUserModel } from '../base/baseUserModel';

export interface CompanyUserDTO extends BaseUserModel {
  companyUserName: string;
  sectorId: string;
  sectorName: string;
  about: string;
  clarification: string;
  workerCount: string;
  yearOfEstablishment: string;
  webAddress: string;
  taxCityId: string;
  taxCityName: string;
  taxOfficeId: string;
  taxOfficeName: string;
  taxNumber: string;
}
