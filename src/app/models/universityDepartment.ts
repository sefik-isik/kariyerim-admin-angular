import { BaseModel } from './baseModel';

export interface UniversityDepartment extends BaseModel {
  universityId: number;
  departmentName: string;
}
