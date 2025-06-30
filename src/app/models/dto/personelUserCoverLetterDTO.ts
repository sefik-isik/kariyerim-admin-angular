import { BasePersonelUserDTOModel } from '../base/basePersonelUserDTOModel';

export interface PersonelUserCoverLetterDTO extends BasePersonelUserDTOModel {
  title: string;
  description: string;
}
