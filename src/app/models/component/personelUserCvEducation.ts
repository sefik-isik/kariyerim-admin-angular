import { BasePersonelUserCvModel } from '../base/basePersonelUserCvModel';

export interface PersonelUserCvEducation extends BasePersonelUserCvModel {
  educationInfo: string;
  universityId: string;
  departmentId: string;
  startDate: string;
  endDate: string;
  abandonment: boolean;
  facultyId: string;
  detail: string;
}
