import { BaseModel } from './baseModel';

export interface UserOperationClaim extends BaseModel {
  userId: number;
  operationClaimId: number;
}
