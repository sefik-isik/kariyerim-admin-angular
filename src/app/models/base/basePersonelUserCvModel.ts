import { BasePersonelUserModel } from './basePersonelUserModel';

export interface BasePersonelUserCvModel extends BasePersonelUserModel {
  cvId: string;
  cvName: string;
}
