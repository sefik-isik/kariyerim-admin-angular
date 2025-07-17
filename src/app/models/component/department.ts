import { BaseModel } from '../base/baseModel';

export interface Department extends BaseModel {
  departmentName: string;
  isCompany: boolean;
}
