import { BaseAdvertModel } from './baseAdvertModel';

export interface BaseCompanyUserAdvertModel extends BaseAdvertModel {
  userId: string;
  companyUserId: string;
}
