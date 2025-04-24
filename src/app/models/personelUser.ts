import { BasePersonelUserModel } from './basePersonelUserModel';

export interface PersonelUser extends BasePersonelUserModel {
  cvId: number;
  licenseId: number;
  birthPlaceId: number;
  dateOfBirth: string;
  gender: boolean;
  nationalStatus: boolean;
  driverLicenceId: number;
  militaryStatus: boolean;
  retirementStatus: boolean;
}
