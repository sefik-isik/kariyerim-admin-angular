import { BaseModel } from '../base/baseModel';

export interface UserForLoginDTO extends BaseModel {
  email: string;
  password: string;
}
