import { BasePersonelUserCvModel } from './basePersonelUserCvModel';

export interface PersonelUserCvEducation extends BasePersonelUserCvModel {
  educationInfo: string;
  universityId: number;
  departmentId: number;
  startDate: string;
  endDate: string;
  abandonment: boolean;
  facultyId: number;
  detail: string;
}
