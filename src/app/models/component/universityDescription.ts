import { BaseModel } from '../base/baseModel';

export interface UniversityDescription extends BaseModel {
  universityId: string;
  title: string;
  description: string;
}
