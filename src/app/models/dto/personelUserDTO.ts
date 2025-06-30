import { BaseUserModel } from '../base/baseUserModel';

export interface PersonelUserDTO extends BaseUserModel {
  identityNumber: string;
  gender: boolean;
  licenseDegreeId: string;
  licenseDegreeName: string;
  birthPlaceId: string;
  birthPlaceName: string;
  driverLicenceId: string;
  driverLicenceName: string;
  nationalStatus: boolean;
  militaryStatus: boolean;
  retirementStatus: boolean;
  dateOfBirth: string;
}
