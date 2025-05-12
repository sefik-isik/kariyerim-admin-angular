import { BasePersonelUserCvDTOModel } from './basePersonelUserCvDTOModel';

export interface PersonelUserCvDTO extends BasePersonelUserCvDTOModel {
  languageId: number;
  languageName: string;
  languageLevelId: number;
  level: number;
  levelTitle: string;
  levelDescription: string;
  birthPlaceId: number;
  birthPlaceName: string;
  isPrivate: boolean;
}
