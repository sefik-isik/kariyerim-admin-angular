import { BaseUniversityModel } from '../base/baseUniversityModel';

export interface UniversityDepartment extends BaseUniversityModel {
  facultyId: string;
  departmentId: string;
}
