import { BasePersonelUserModel } from './basePersonelUserModel';

export interface PersonelUserFile extends BasePersonelUserModel {
  fileOwnName: string;
  fileName: string;
  filePath: string;
}
