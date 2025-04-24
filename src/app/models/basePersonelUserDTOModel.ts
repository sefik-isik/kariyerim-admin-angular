import { BaseUserDTOModel } from './baseUserDTOModel';

export interface BasePersonelUserDTOModel extends BaseUserDTOModel {
  personelUserId: number;
  identityNumber: number;
}
