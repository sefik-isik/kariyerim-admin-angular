import { BaseModel } from '../base/baseModel';

export interface UniversityDepartmentDescriptionDTO extends BaseModel {
  universityDepartmentId: string;
  universityDepartmentName: string;
  title: string;
  description: string;
}
