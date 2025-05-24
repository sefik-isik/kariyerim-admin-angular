import { BaseModel } from './baseModel';

export interface DepartmentDetail extends BaseModel {
  departmentId: number;
  title: string;
  description: string;
}
