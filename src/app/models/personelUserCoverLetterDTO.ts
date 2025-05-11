import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserCoverLetterDTO extends BasePersonelUserDTOModel {
  title: string;
  description: string;
}
