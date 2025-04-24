import { BasePersonelUserCvModel } from './basePersonelUserCvModel';

export interface PersonelUserCvSummary extends BasePersonelUserCvModel {
  cVSummaryTitle: string;
  cVSummaryDescription: string;
}
