import { BasePersonelUserModel } from '../base/basePersonelUserModel';

export interface PersonelUserFile extends BasePersonelUserModel {
  fileName: string;
  fileOwnName: string;
  filePath: string;
}
