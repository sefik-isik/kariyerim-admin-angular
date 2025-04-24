import { BasePersonelUserDTOModel } from './basePersonelUserDTOModel';

export interface PersonelUserDTO extends BasePersonelUserDTOModel {
  dateOfBirth: string;
  gender: boolean;
  nationalStatus: boolean;
  driverLicenceId: number;
  driverLicenceName: string;
  militaryStatus: boolean;
  retirementStatus: boolean;
}
