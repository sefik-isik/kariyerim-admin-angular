import { BaseAdvertModel } from './baseAdvertModel';

export interface BaseCompanyUserAdvertDTOModel extends BaseAdvertModel {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  code: string;
  companyUserId: string;
  companyUserName: string;
}
