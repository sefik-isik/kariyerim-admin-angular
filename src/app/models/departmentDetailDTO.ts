import { BaseModel } from './baseModel';

export interface DepartmentDetailDTO extends BaseModel {
  departmentId: number;
  departmentName: string;
  title: string;
  description: string;
}
