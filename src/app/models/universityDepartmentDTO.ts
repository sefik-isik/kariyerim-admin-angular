import { BaseModel } from './baseModel';

export interface UniversityDepartmentDTO extends BaseModel {
  universityName: string;
  departmentName: string;
}
