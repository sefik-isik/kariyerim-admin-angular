import { BasePersonelUserModel } from './basePersonelUserModel';

export interface PersonelUserFile extends BasePersonelUserModel {
  fileName: string;
  filePath: string;
}
