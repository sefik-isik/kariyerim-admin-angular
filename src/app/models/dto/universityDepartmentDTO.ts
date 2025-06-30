import { BaseUniversityDTOModel } from '../base/baseUniversityDTOModel';

export interface UniversityDepartmentDTO extends BaseUniversityDTOModel {
  facultyId: string;
  facultyName: string;
  departmentId: string;
  departmentName: string;
}
