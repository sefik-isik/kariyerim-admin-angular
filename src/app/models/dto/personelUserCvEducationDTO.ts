import { BasePersonelUserCvDTOModel } from '../base/basePersonelUserCvDTOModel';

export interface PersonelUserCvEducationDTO extends BasePersonelUserCvDTOModel {
  educationInfo: string;
  universityId: string;
  universityName: string;
  departmentId: string;
  departmentName: string;
  facultyId: string;
  facultyName: string;
  startDate: string;
  endDate: string;
  abandonment: boolean;
  detail: string;
}
