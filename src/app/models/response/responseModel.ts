import { BaseModel } from '../base/baseModel';

export interface ResponseModel extends BaseModel {
  success: boolean;
  message: string;
}
