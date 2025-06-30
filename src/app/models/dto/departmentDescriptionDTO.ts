import { BaseModel } from '../base/baseModel';

export interface DepartmentDescriptionDTO extends BaseModel {
  departmentId: string;
  departmentName: string;
  title: string;
  description: string;
}
