import { BaseModel } from './baseModel';

export interface Region extends BaseModel {
  cityId: number;
  regionName: string;
}
