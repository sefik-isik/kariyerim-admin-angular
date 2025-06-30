import { BaseUserModel } from '../base/baseUserModel';

export interface UserOperationClaimDTO extends BaseUserModel {
  operationClaimId: string;
  operationClaimName: string;
}
