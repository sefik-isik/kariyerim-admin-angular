import { BasePersonelUserCvModel } from './basePersonelUserCvModel';

export interface PersonelUserCvEducation extends BasePersonelUserCvModel {
  educationInfo: string;
  abandonment: boolean;
  universityId: number;
  departmentId: number;
  startDate: string;
  endDate: string;
  facultyId: number;
  detail: string;
}
