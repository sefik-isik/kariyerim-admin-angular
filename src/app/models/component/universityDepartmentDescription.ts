import { BaseModel } from '../base/baseModel';

export interface UniversityDepartmentDescription extends BaseModel {
  universityDepartmentId: string;
  title: string;
  description: string;
}
