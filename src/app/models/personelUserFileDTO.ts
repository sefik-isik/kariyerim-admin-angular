import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserFileDTO extends BasePersonelUserDTOModel {
  fileName: string;
  filePath: string;
}
