import { DriverLicence } from './driverLicence';
import { BaseCompanyUserModel } from '../base/baseCompanyUserModel';

export interface CompanyUserAdvert extends BaseCompanyUserModel {
  advertName: string;
  workAreaId: string;
  workingMethodId: string;
  experienceId: string;
  departmentId: string;
  licenseDegreeId: string;
  positionId: string;
  positionLevelId: string;
  militaryStatus: boolean;
  languageId: string;
  languageLevelId: string;
  driverLicenceId: string;
  countryId: string;
  cityId: string;
  regionId: string;
  sectorId: string;
}
