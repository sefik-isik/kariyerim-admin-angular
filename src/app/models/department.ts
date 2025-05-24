import { BaseModel } from './baseModel';

export interface Department extends BaseModel {
  universityId: number;
  departmentName: string;
}
