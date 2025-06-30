import { BaseModel } from '../base/baseModel';

export interface UserForRegisterDTO extends BaseModel {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}
