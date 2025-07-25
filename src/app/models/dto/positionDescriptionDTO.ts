import { BaseModel } from '../base/baseModel';

export interface PositionDescriptionDTO extends BaseModel {
  positionId: string;
  positionName: string;
  title: string;
  description: string;
}
