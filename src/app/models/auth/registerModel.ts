import { BaseModel } from '../base/baseModel';

export interface RegisterModel extends BaseModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  code: string; // 'company' | 'personel';
}
