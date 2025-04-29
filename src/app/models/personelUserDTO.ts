import { BaseUserDTOModel } from './baseUserDTOModel';

export interface PersonelUserDTO extends BaseUserDTOModel {
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
