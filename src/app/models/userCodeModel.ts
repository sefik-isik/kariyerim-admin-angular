import { BaseModel } from './baseModel';

export interface UserCodeModel extends BaseModel {
  code: string;
  email: string;
}
