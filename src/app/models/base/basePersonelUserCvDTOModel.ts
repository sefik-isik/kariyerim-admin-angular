import { BasePersonelUserModel } from './basePersonelUserModel';

export interface BasePersonelUserCvDTOModel extends BasePersonelUserModel {
  cvId: string;
  cvName: string;
}
