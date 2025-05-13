import { BasePersonelUserCvModel } from './basePersonelUserCvModel';

export interface PersonelUserCvSummaryDTO extends BasePersonelUserCvModel {
  cvSummaryTitle: string;
  cvSummaryDescription: string;
}
