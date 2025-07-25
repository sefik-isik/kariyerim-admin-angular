import { BaseModel } from '../base/baseModel';

export interface UniversityDescriptionDTO extends BaseModel {
  universityId: string;
  universityName: string;
  title: string;
  description: string;
}
