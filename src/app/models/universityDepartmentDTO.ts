import { BaseModel } from './baseModel';

export interface UniversityDepartmentDTO extends BaseModel {
  universityId: number;
  departmentId: number;
  facultyId: number;
  universityName: string;
  facultyName: string;
  departmentName: string;
}
