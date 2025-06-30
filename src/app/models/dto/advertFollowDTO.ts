import { BaseAdvertDTOModel } from '../base/baseAdvertDTOModel';

export interface AdvertFollowDTO extends BaseAdvertDTOModel {
  companyUserId: string;
  companyUserName: string;
  personelUserId: string;
  identityNumber: string;
}
