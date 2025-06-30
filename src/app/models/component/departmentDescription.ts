import { BaseModel } from '../base/baseModel';

export interface DepartmentDescription extends BaseModel {
  departmentId: string;
  title: string;
  description: string;
}
