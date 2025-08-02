import { BaseModel } from '../base/baseModel';

export interface Count extends BaseModel {
  countValue: string;
  order: number;
}
