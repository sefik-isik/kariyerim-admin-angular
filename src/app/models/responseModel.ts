import { BaseModel } from './baseModel';

export interface ResponseModel extends BaseModel {
  success: boolean;
  message: string;
}
