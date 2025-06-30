import { BaseUserModel } from '../base/baseUserModel';

export interface UserOperationClaim extends BaseUserModel {
  operationClaimId: string;
}
