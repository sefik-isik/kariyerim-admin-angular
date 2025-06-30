import { BasePersonelUserModel } from '../base/basePersonelUserModel';

export interface PersonelUserCv extends BasePersonelUserModel {
  cvName: string;
  languageId: string;
  languageLevelId: string;
  isPrivate: boolean;
}
