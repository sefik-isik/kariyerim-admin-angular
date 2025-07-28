import { BaseModel } from '../base/baseModel';

export interface UniversityDepartmentDescriptionDTO extends BaseModel {
  departmentId: string;
  departmentName: string;
  title: string;
  description: string;
}
