import { BaseAdvertDTOModel } from '../base/baseAdvertDTOModel';

export interface AdvertApplicationDTO extends BaseAdvertDTOModel {
  companyUserId: string;
  companyUserName: string;
  personelUserId: string;
  identityNumber: string;
}
