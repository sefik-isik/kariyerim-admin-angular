import { BasePersonelUserCvModel } from '../base/basePersonelUserCvModel';

export interface PersonelUserCvSummary extends BasePersonelUserCvModel {
  cvSummaryTitle: string;
  cvSummaryDescription: string;
}
