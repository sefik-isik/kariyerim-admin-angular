import { BaseModel } from '../base/baseModel';

export interface UniversityDepartmentDescription extends BaseModel {
  departmentId: string;
  title: string;
  description: string;
}
