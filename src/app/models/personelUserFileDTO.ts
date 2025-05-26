import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserFileDTO extends BasePersonelUserDTOModel {
  fileOwnName: string;
  fileName: string;
  filePath: string;
}
