import { BaseUserModel } from './baseUserModel';

export interface PersonelUserDTO extends BaseUserModel {
  identityNumber: string;
  dateOfBirth: string;
  gender: boolean;
  nationalStatus: boolean;
  driverLicenceId: number;
  driverLicenceName: string;
  licenceDegreeId: number;
  licenceDegreeName: string;
  birthPlaceId: number;
  birthPlaceName: string;
  militaryStatus: boolean;
  retirementStatus: boolean;
}
