import { BaseModel } from './baseModel';

export interface UserOperationClaimDTO extends BaseModel {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  operationClaimId: number;
  operationClaimName: string;
}
