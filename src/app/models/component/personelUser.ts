import { BasePersonelUserModel } from '../base/basePersonelUserModel';
import { BaseUserModel } from '../base/baseUserModel';

export interface PersonelUser extends BaseUserModel {
  identityNumber: string;
  gender: boolean;
  licenseDegreeId: string;
  birthPlaceId: string;
  nationalStatus: boolean;
  militaryStatus: boolean;
  retirementStatus: boolean;
  driverLicenceId: string;
  dateOfBirth: string;
}
