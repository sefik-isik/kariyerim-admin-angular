import { BaseModel } from './baseModel';

export interface UniversityDepartment extends BaseModel {
  universityId: number;
  facultyId: number;
  departmentId: number;
}
