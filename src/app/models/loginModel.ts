import { BaseModel } from './baseModel';

export interface LoginModel extends BaseModel {
  email: string;
  password: string;
}
