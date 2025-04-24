import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface BasePersonelUserCvDTOModel extends BasePersonelUserDTOModel {
  cvId: number;
  cvName: string;
}
