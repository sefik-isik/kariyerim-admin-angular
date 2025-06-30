import { BasePersonelUserCvDTOModel } from '../base/basePersonelUserCvDTOModel';

export interface PersonelUserCvSummaryDTO extends BasePersonelUserCvDTOModel {
  cvSummaryTitle: string;
  cvSummaryDescription: string;
}
