import { BasePersonelUserCvDTOModel } from './basePersonelUserCvDTOModel';

export interface PersonelUserCvEducationDTO extends BasePersonelUserCvDTOModel {
  educationInfo: string;
  universityName: string;
  departmentName: string;
  startDate: string;
  endDate: string;
  facultyName: string;
  detail: string;
}
