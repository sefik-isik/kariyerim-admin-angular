import { BasePersonelUserModel } from './basePersonelUserModel';
import { BaseUserModel } from './baseUserModel';

export interface BasePersonelUserCvModel extends BasePersonelUserModel {
  cvId: number;
  cvName: string;
}
