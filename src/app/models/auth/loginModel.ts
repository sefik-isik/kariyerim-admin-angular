import { BaseModel } from '../base/baseModel';

export interface LoginModel extends BaseModel {
  id: string;
  email: string;
  password: string;
  userType: boolean;
}
