import { BaseModel } from './baseModel';

export interface UniversityDepartmentDTO extends BaseModel {
  universityId: number;
  universityName: string;
  departmentName: string;
}
