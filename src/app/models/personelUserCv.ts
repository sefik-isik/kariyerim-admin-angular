import { BasePersonelUserCvModel } from './basePersonelUserCvModel';

export interface PersonelUserCv extends BasePersonelUserCvModel {
  cvName: string;
  languageId: number;
  languageLevelId: number;
  isPrivate: boolean;
}
