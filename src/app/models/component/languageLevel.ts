import { BaseModel } from '../base/baseModel';

export interface LanguageLevel extends BaseModel {
  level: number;
  levelTitle: string;
  levelDescription: string;
}
