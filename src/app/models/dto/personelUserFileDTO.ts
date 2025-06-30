import { BasePersonelUserDTOModel } from '../base/basePersonelUserDTOModel';

export interface PersonelUserFileDTO extends BasePersonelUserDTOModel {
  fileName: string;
  fileOwnName: string;
  filePath: string;
}
