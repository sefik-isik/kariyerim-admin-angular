import { BaseModel } from './baseModel';
export interface TokenModel extends BaseModel {
  token: string;
  expiration: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
}
