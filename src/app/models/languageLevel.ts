import { BaseModel } from './baseModel';

export interface LanguageLevel extends BaseModel {
  level: number;
  levelTitle: string;
  levelDescription: string;
}
