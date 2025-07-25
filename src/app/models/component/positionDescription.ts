import { BaseModel } from '../base/baseModel';

export interface PositionDescription extends BaseModel {
  positionId: string;
  title: string;
  description: string;
}
