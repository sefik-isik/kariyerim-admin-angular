import { BasePersonelUserModel } from './basePersonelUserModel';
import { BaseUserModel } from './baseUserModel';

export interface PersonelUser extends BaseUserModel {
  licenceDegreeId: number;
  birthPlaceId: number;
  dateOfBirth: string;
  gender: boolean;
  nationalStatus: boolean;
  driverLicenceId: number;
  militaryStatus: boolean;
  retirementStatus: boolean;
}
