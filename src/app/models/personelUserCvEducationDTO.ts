import { BasePersonelUserCvDTOModel } from './basePersonelUserCvDTOModel';

export interface PersonelUserCvEducationDTO extends BasePersonelUserCvDTOModel {
  educationInfo: string;
  universityId: number;
  universityName: string;
  departmentId: number;
  departmentName: string;
  abandonment: boolean;
  startDate: string;
  endDate: string;
  facultyId: number;
  facultyName: string;
  detail: string;
}
