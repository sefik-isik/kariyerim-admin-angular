import { BasePersonelUserCvDTOModel } from '../base/basePersonelUserCvDTOModel';

export interface PersonelUserCvDTO extends BasePersonelUserCvDTOModel {
  languageId: string;
  languageName: string;
  identityNumber: string;
  dateOfBirth: string;
  languageLevelId: string;
  level: number;
  levelTitle: string;
  levelDescription: string;
  licenseId: string;
  licenseName: string;
  birthPlaceId: string;
  birthPlaceName: string;
  isPrivate: boolean;
}
